import { Component, OnInit, ViewChild } from "@angular/core";
import { CartModalComponent } from "src/app/shared/components/modal/cart-modal/cart-modal.component";
import { CartService } from "../collection/services/cart.service";
import { ProductService } from "../collection/services/product.service";
import { IWishList, ICartItem, IVariation } from "../interfaces/interface";
import { WishListService } from "./services/wishlist.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
})
export class WishlistComponent implements OnInit {
  public wishList: IWishList[] = [];
  loader: boolean = true;

  @ViewChild("cartModal") CartModal: CartModalComponent;

  constructor(
    public productService: ProductService,
    private wishListService: WishListService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if(this.loader){
      this.wishListService.getByWishList().subscribe((res) => {
        this.wishList = res;
        this.loader = false
      }, (err) => {
        this.loader = false
      });

    }
  }

  addToCart(wish: IWishList) {
    console.log(wish)
    const payload: ICartItem[] = [{
      quantity: 1,
      variation: wish.variation
    }]
    this.cartService.addCartItem(payload).subscribe(() => {
      this.CartModal.openModal(wish.variation)
    })
  }

  removeItem(variationId: number) {
    this.wishListService.removeByWishList(variationId).subscribe((res) => {
      this.wishList = this.wishList.filter((variation) => variation.id !== res.id);
    });
  }
}
