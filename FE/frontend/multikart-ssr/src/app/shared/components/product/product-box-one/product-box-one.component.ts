import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { ICartItems, IProduct } from "src/app/shop/interfaces/interface";
import { WishListService } from "src/app/shop/wishlist/services/wishlist.service";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { CartService } from "src/app/shop/collection/services/cart.service";

@Component({
  selector: "app-product-box-one",
  templateUrl: "./product-box-one.component.html",
  styleUrls: ["./product-box-one.component.scss"],
})
export class ProductBoxOneComponent implements OnInit {
  @Input() product: IProduct;
  @Input() thumbnail: boolean = false; // Default False
  @Input() onHowerChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = true; // Default False
  @Input() loader: boolean = false;
  @Input() isInHome: boolean = false;

  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  isNew: boolean = false;
  isWish: boolean = false;
  currentVariationIndex: number = 0;
  isLogged: boolean;

  constructor(
    private wishListService: WishListService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService, // TODO: gestire le modal con un servizio ?
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this.loader) {
      this.isLogged = this.authService.isLoggedIn()

      const prodId = this.route.snapshot.queryParams.prodId;
      if (prodId == this.product.id) {
        this.addToWishlist(this.route.snapshot.queryParams.varId);
      }

      const now = new Date();
      const date = new Date(this.product.created_at);
      now.setDate(now.getDate() - 7);
      this.isNew = date > now;

      setTimeout(() => {
        this.isWishVariation();
        this.loader = false;
      }, 2000); // Skeleton Loader
    }
    this.wishListService.wishlist$.subscribe((newWish) => {
      if (
        newWish?.id_variation ==
        this.product.variations[this.currentVariationIndex].id
      ) {
        this.isWish = true;
      }
    });
  }

  // Change Variants
  changeVariations(current: number) {
    this.currentVariationIndex = current;
    this.isWishVariation();
  }

  // Change Variants Image
  ChangeVariantsImage(src) {
    this.product.variations[this.currentVariationIndex].media[0].url = src;
  }

  addToCart() {
    const cartItem: ICartItems = {
      quantity: 1,
      variations: this.product.variations[this.currentVariationIndex]
    }
    this.cartService.setCartItem(cartItem).subscribe((res) => {
      this.CartModal.openModal(this.product.variations[this.currentVariationIndex])
    })
  }

  onWishlist() {
    return this.isWish ? this.removeToWishList() : this.addToWishlist(this.product.variations[this.currentVariationIndex].id);
  }

  addToWishlist(id: number) {
    const callback = encodeURIComponent(
      `${this.router.url}?prodId=${this.product.id}&varId=${id}`
    );

    const payload = id
      ? id
      : this.product.variations[this.currentVariationIndex].id;

    this.wishListService.addToWishList(payload, callback).subscribe((res) => {
      // far uscire una modale con scritto 'variante aggiunta con successo'
      const modal = this.modal.success({
        nzTitle: 'Product Added to Your Wishlist',
      });
  
      setTimeout(() => modal.destroy(), 1000);
    });
  }

  removeToWishList() {
    this.wishListService
      .removeByWishList(this.product.variations[this.currentVariationIndex].id)
      .subscribe((res) => {
        this.isWish = false;
      });
  }

  isWishVariation() {
    this.wishListService.getByWishList().subscribe((res) => {
      res?.forEach((wish) => {
        if (
          this.product.variations[this.currentVariationIndex].id ==
          wish.id_variation
        )
          this.isWish = true;
      });
    });
  }
}
