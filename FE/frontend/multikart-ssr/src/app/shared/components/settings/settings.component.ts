import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Product } from "../../classes/product";
import { ProductService } from 'src/app/shop/collection/services/product.service';
import { ICart, ICartItems } from 'src/app/shop/interfaces/interface';
import { CartService } from 'src/app/shop/collection/services/cart.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public cartItem: ICartItems[] = [];
  public search: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItem().subscribe((res) => {
      // this.cartItem = res.items
    })
  }

  searchToggle(){
    this.search = !this.search;
  }

  // get getTotal(): Observable<number> {
  //   return this.productService.cartTotalAmount();
  // }

  // removeItem(product: any) {
  //   this.productService.removeCartItem(product);
  // }

  changeCurrency(currency: any) {
     
  }

}
