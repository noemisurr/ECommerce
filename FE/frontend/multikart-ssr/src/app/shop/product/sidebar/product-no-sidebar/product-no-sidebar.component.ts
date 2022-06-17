import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProductDetailsMainSlider,
  ProductDetailsThumbSlider,
} from "../../../../shared/data/slider";
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { ProductService } from "src/app/shop/collection/services/product.service";
import { IProduct, IReview } from "src/app/shop/interfaces/interface";
import { WishListService } from "src/app/shop/wishlist/services/wishlist.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ReviewService } from "src/app/pages/account/services/review.service";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: "app-product-no-sidebar",
  templateUrl: "./product-no-sidebar.component.html",
  styleUrls: ["./product-no-sidebar.component.scss"],
})
export class ProductNoSidebarComponent implements OnInit {
  public product: IProduct;
  public counter: number = 1;
  public selectedSize: any;
  currentVariationIndex: number = 0;
  isWish: boolean = false;
  isLogged: boolean = false;

  reviewForm = this.fb.group({
    title: ["", Validators.required],
    text: ["", Validators.required],
    star: ['', Validators.required],
  });

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

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
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((is) => {
      this.isLogged = is
    });
    
    this.productService
    .getById(this.route.snapshot.queryParams.id)
    .subscribe((res) => {
      this.product = res;
      this.reviewForm.patchValue({'star': res.star})
      
      const prodId = this.route.snapshot.queryParams.prodId;
      if (prodId == this.product.id) {
        this.addToWishlist(this.route.snapshot.queryParams.varId);
      }
    });

    if (this.isLogged) this.isWishVariation();

    this.wishListService.wishlist$.subscribe((newWish) => {
      console.log('new wish ::', newWish.id_variation)
      console.log('new wish::', this.product.variations[this.currentVariationIndex].id)
      if (
        newWish?.id_variation ===
        this.product.variations[this.currentVariationIndex].id && newWish
      ) {
        this.isWish = true;
      }else {
        this.isWish = false;
      }
    });
  }

  changeVariations(current: number) {
    this.currentVariationIndex = current;
    if (this.isLogged) this.isWishVariation();
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size);
      }
    }
    return uniqSize;
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
  async addToCart(product: any) {
    // product.quantity = this.counter || 1;
    // const status = await this.productService.addToCart(product);
    // if (status) this.router.navigate(["/shop/cart"]);
  }

  // Buy Now
  async buyNow(product: any) {
    // product.quantity = this.counter || 1;
    // const status = await this.productService.addToCart(product);
    // if (status) this.router.navigate(["/shop/checkout"]);
  }

  onWishlist() {
    return this.isWish ? this.removeToWishlist() : this.addToWishlist(this.product.variations[this.currentVariationIndex].id);
  }

  // Add to Wishlist
  addToWishlist(id: number) {
    const callback = encodeURIComponent(
      `${this.router.url}?prodId=${this.product.id}&varId=${id}`
    );

    const payload = id
      ? id
      : this.product.variations[this.currentVariationIndex].id;

      console.log('PAYLOAD id::', payload)

    this.wishListService.addToWishList(payload, callback).subscribe((res) => {
      const modal = this.modal.success({
        nzTitle: 'Product Added to Your Wishlist',
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
    this.wishListService.getByWishList().subscribe((res) => {
      res.forEach((wish) => {
        if (
          this.product.variations[this.currentVariationIndex].id ==
          wish.id_variation
        ){

          this.isWish = true;
        }else {
          this.isWish = false;
        }
      });
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
      console.log("TTTAPPOOOO");
    });
  }
}
