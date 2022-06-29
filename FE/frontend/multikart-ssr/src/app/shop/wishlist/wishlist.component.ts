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

  @ViewChild("cartModal") CartModal: CartModalComponent;

  constructor(
    public productService: ProductService,
    private wishListService: WishListService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.wishListService.getByWishList().subscribe((res) => {
      this.wishList = res;
    });
  }

  addToCart(variation: IVariation) {
    const payload: ICartItem[] = [{
      quantity: 1,
      variation: variation
    }]
    this.cartService.addCartItem(payload).subscribe(() => {
      this.CartModal.openModal(variation)
    })
  }

  removeItem(variationId: number) {
    this.wishListService.removeByWishList(variationId).subscribe((res) => {
      this.wishList = this.wishList.filter((variation) => variation.id !== res.id);
    });
  }
}
