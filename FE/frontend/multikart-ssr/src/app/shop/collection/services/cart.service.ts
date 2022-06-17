import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { environment } from "src/environments/environment";
import { ICart, ICartItems } from "../../interfaces/interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItem = new BehaviorSubject<ICartItems[]>(null);
  public cartItem$ = this.cartItem.asObservable();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.isLogged$.subscribe((isLogged) => {
      //if(isLogged) QUANDO SI LOGGA DEVO AGGIUNGERE TUTTI I CART ITEM DEL LOCALSTORAGE NEL DB
    });
  }

  setCartItem(cartItem: ICartItems): Observable<ICart | ICartItems[]> {
    if (!this.authService.isLoggedIn()) {
      let cart: ICartItems[] =
        JSON.parse(localStorage.getItem("cartItem")) || [];

      cart.push(cartItem);

      const item = JSON.stringify(cart);

      localStorage.setItem("cartItem", item);
      this.cartItem.next(cart);
      return of(cart);
    }
    return this.http
      .post<ICart>(`${environment.apiUrl}/cart_item`, cartItem)
      .pipe(
        map((res) => {
          this.cartItem.next(res.items);
          return res;
        })
      );
  }

  getCartItem(): Observable<ICart> {
    if (!this.authService.isLoggedIn()) {
      const carts: ICart = JSON.parse(localStorage.getItem("cartItem"));
      return of(carts);
    }
    return this.http.get<ICart>(`${environment.apiUrl}/cart_item`);
  }

  removeCartItem() {}
}
