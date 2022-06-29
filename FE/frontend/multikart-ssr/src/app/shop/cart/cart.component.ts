import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { CartService } from "../collection/services/cart.service";
import { ICartItem } from "../interfaces/interface";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cart: ICartItem[];
  total: number;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItem$.subscribe((res) => {
      this.cart = res.cartItems;
      this.total = res.total
    });
  }

  // Increament
  increment(cartItem: ICartItem) {
    cartItem.quantity += 1;
    this.cartService.updateItems(cartItem).subscribe();
  }

  // Decrement
  decrement(cartItem: ICartItem) {
    if (cartItem.quantity === 1) return;
    cartItem.quantity -= 1;
    this.cartService.updateItems(cartItem).subscribe();
  }

  removeItem(cartItem: ICartItem) {
    this.cartService.removeCartItem(cartItem).subscribe();
  }

  onCheckOut() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl("/shop/checkout");
    } else {
      const callback = encodeURIComponent("/shop/checkout");
      this.router.navigateByUrl(`/pages/login?callback=${callback}`);
    }
  }
}
