import { Component, OnInit } from "@angular/core";
import { ProductService } from "../collection/services/product.service";
import { IWishList } from "../interfaces/interface";
import { WishListService } from "./services/wishlist.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
})
export class WishlistComponent implements OnInit {
  public variations: IWishList[] = [];

  constructor(
    public productService: ProductService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.wishListService.getByWishList().subscribe((res) => {
      this.variations = res;
    });
  }

  async addToCart(product?: any) {}

  removeItem(variationId: number) {
    this.wishListService.removeByWishList(variationId).subscribe((res) => {
      this.variations = this.variations.filter((variation) => variation.id !== res.id);
    });
  }
}
