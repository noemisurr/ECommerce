import { AfterViewChecked, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "../../../../shared/data/slider";
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { ProductService } from "src/app/shop/collection/services/product.service";
import {
  ICartItem,
  IProduct,
  IReview,
  IWishList,
} from "src/app/shop/interfaces/interface";
import { WishListService } from "src/app/shop/wishlist/services/wishlist.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ReviewService } from "src/app/pages/account/services/review.service";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { NzModalService } from "ng-zorro-antd/modal";
import { CartService } from "src/app/shop/collection/services/cart.service";
import { CartModalComponent } from "src/app/shared/components/modal/cart-modal/cart-modal.component";

@Component({
  selector: "app-product-no-sidebar",
  templateUrl: "./product-no-sidebar.component.html",
  styleUrls: ["./product-no-sidebar.component.scss"],
})
export class ProductNoSidebarComponent implements OnInit {
  public product: IProduct;
  public counter: number = 1;
  public selectedSize: any;
  loader: boolean = true;
  currentVariationIndex: number = 0;
  currentImageIndex: number = 0;
  isWish: boolean = false;
  isLogged: boolean = false;
  wishes: IWishList[];

  reviewForm = this.fb.group({
    title: ["", Validators.required],
    text: ["", Validators.required],
    star: ["", Validators.required],
  });

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private wishListService: WishListService,
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router,
    private modal: NzModalService,
    private cartService: CartService
  ) {}
  

  ngOnInit(): void {
    window.scrollTo(0, 0)
    if (this.loader) {
      this.authService.isLogged$.subscribe((is) => {
        this.isLogged = is;
      });

      this.productService
        .getById(this.route.snapshot.queryParams.id)
        .subscribe((res) => {
          this.product = res;
          this.reviewForm.patchValue({ star: res.star });

          const prodId = this.route.snapshot.queryParams.prodId;
          if (prodId == this.product.id) {
            this.addToWishlist(this.route.snapshot.queryParams.varId);
          }
          setTimeout(() => {
            this.loader = false;
          }, 1000); // Skeleton Loader
        });

      if (this.isLogged) this.isWishVariation();
    }

    //TODO: sincronizzare questa subscribe con quella di sopra
    this.wishListService.wishlist$.subscribe((wishes) => {
      this.wishes = wishes;
      this.isWishVariation();
    });
  }

  changeVariations(current: number) {
    this.currentVariationIndex = current;
    if (this.isLogged) this.isWishVariation();
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  addToCart() {
    const cartItem: ICartItem[] = [
      {
        quantity: 1,
        variation: this.product.variations[this.currentVariationIndex],
      },
    ];
    this.cartService.addCartItem(cartItem).subscribe((res) => {
      this.CartModal.openModal(
        this.product.variations[this.currentVariationIndex]
      );
    });
  }

  onWishlist() {
    return this.isWish
      ? this.removeToWishlist()
      : this.addToWishlist(
          this.product.variations[this.currentVariationIndex].id
        );
  }

  // Add to Wishlist
  addToWishlist(id: number) {
    const callback = encodeURIComponent(
      `${this.router.url}?prodId=${this.product.id}&varId=${id}`
    );

    const payload = id
      ? id
      : this.product.variations[this.currentVariationIndex].id;

    this.wishListService.addToWishList(payload, callback).subscribe((res) => {
      const modal = this.modal.success({
        nzTitle: "Product Added to Your Wishlist",
      });

      setTimeout(() => modal.destroy(), 1000);
    });
  }

  removeToWishlist() {
    this.wishListService
      .removeByWishList(this.product.variations[this.currentVariationIndex].id)
      .subscribe((res) => {
        this.isWish = false;
      });
  }

  isWishVariation() {
    this.wishes?.forEach((wish) => {
      if (
        wish.id_variation ===
          this.product.variations[this.currentVariationIndex].id &&
        wish
      ) {
        this.isWish = true;
      } else {
        this.isWish = false;
      }
    });
  }

  onAddReview() {
    const payload: IReview = {
      title: this.reviewForm.get("title").value,
      text: this.reviewForm.get("text").value,
      star: this.reviewForm.get("star").value,
      id_product: this.route.snapshot.queryParams.id,
    };

    this.reviewService.add(payload).subscribe(() => {
      //TODO: far uscire nz message o quello che stavo usando finora o fare un servizio che mostra gli nz message
      console.log("TTTAPPOOOO");
    });
  }
  // Get Product Size
  // Size(variants) {
  //   const uniqSize = [];
  //   for (let i = 0; i < Object.keys(variants).length; i++) {
  //     if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
  //       uniqSize.push(variants[i].size);
  //     }
  //   }
  //   return uniqSize;
  // }
  // Buy Now
  // async buyNow(product: any) {
  //   // product.quantity = this.counter || 1;
  //   // const status = await this.productService.addToCart(product);
  //   // if (status) this.router.navigate(["/shop/checkout"]);
  // }
}
