import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { ICartItem } from "src/app/shop/interfaces/interface";
import { CartService } from "src/app/shop/collection/services/cart.service";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormControl } from "@angular/forms";
import { ProductService } from "src/app/shop/collection/services/product.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {

  public cart: ICartItem[];
  total: number
  searchForm = this.fb.group({
    tags: ['']
  })

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItem$.subscribe((res) => {
      this.cart = res.cartItems;
      this.total = res.total
    });
  }

  onSearch() {
    const tags = encodeURIComponent(this.searchForm.get('tags').value)
    this.searchForm.setValue({tags: ''})
    this.router.navigateByUrl(`shop/list?search=${tags}`)
  }

  removeItem(item: ICartItem) {
    this.cartService.removeCartItem(item).subscribe();
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
