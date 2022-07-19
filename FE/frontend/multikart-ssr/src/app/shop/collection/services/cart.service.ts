import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, BehaviorSubject, EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { DiscountPipe } from "src/app/shared/pipes/discount.pipe";
import { environment } from "src/environments/environment";
import { ICart, ICartItem } from "../../interfaces/interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart: ICart = {
    total: 0,
    cartItems: [],
  };
  private cartItem = new BehaviorSubject<ICart>(this.cart);
  public cartItem$ = this.cartItem.asObservable();
  public discountPipe = new DiscountPipe();

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getCartItem().subscribe();
    this.authService.isLogged$.subscribe((isLogged) => {
      if (isLogged) {
        this.getCartItem().subscribe(
          (res) => {
            console.log("added", res);
          },
          (err) => {
            const items = JSON.parse(localStorage.getItem("cart"));
            this.addCartItem(items.cartItems).subscribe(() => {
              localStorage.removeItem("cart");
            });
          }
        );
      }
    });
  }

  addCartItem(cartItem: ICartItem[]): Observable<ICartItem[]> {
    if (!this.authService.isLoggedIn()) {
      this.cart = JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : this.cart;

      const existIndex = this.cart.cartItems.findIndex((item) => {
        return item.variation.id === cartItem[0].variation.id;
      });
      if (existIndex >= 0) {
        this.cart.cartItems[existIndex].quantity += 1;
        this.cart.total += this.discountPipe.transform(
          cartItem[0].variation.price,
          cartItem[0].variation.discount
        );
      } else {
        this.cart.cartItems.push(cartItem[0]);
        this.cart.total +=
          this.discountPipe.transform(
            cartItem[0].variation.price,
            cartItem[0].variation.discount
          ) * cartItem[0].quantity;
      }

      const item = JSON.stringify(this.cart);

      localStorage.setItem("cart", item);
      this.cartItem.next(this.cart);
      return of(this.cart.cartItems);
    } else {
      return this.http
        .post<ICartItem[]>(`${environment.apiUrl}/cart`, cartItem)
        .pipe(
          map((res) => {
            console.log(res)
            const total = res.reduce((acc, item) => {
              return (
                acc +
                this.discountPipe.transform(
                  item?.variation?.price,
                  item?.variation?.discount
                ) *
                  item?.quantity
              );
            }, 0);
            this.cartItem.next({ total: total, cartItems: res });
            return res;
          })
        );
    }
  }

  getCartItem(): Observable<ICartItem[]> {
    if (!this.authService.isLoggedIn()) {
      this.cart = JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : this.cart;

      this.cartItem.next(this.cart);
      return of(this.cart.cartItems);
      // devo impostare il totale
    } else {
      return this.http.get<ICartItem[]>(`${environment.apiUrl}/cart`).pipe(
        map((res) => {
          const total = res.reduce((acc, cartItem) => {
            return (
              acc +
              this.discountPipe.transform(
                cartItem?.variation?.price,
                cartItem?.variation?.discount
              ) *
                cartItem?.quantity
            );
          }, 0);
          this.cartItem.next({ total: total, cartItems: res });
          return res;
        })
      );
    }
  }

  updateItems(cartItem: ICartItem): Observable<ICartItem[]> {
    if (!this.authService.isLoggedIn()) {
      this.cart.cartItems = [...this.cart.cartItems];
      this.cart.total +=
        this.discountPipe.transform(
          cartItem.variation.price,
          cartItem.variation.discount
        ) * cartItem.quantity;

      this.cartItem.next(this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      return of(this.cart.cartItems);
    } else {
      return this.http
        .put(`${environment.apiUrl}/cart/${cartItem.id}`, cartItem)
        .pipe(
          map((res: ICartItem[]) => {
            const total = res.reduce((acc, cartItem) => {
              return (
                acc +
                this.discountPipe.transform(
                  cartItem.variation.price,
                  cartItem.variation.discount
                ) *
                  cartItem.quantity
              );
            }, 0);
            this.cartItem.next({ total: total, cartItems: res });
            return res;
          })
        );
    }
  }

  removeCartItem(item: ICartItem) {
    if (!this.authService.isLoggedIn()) {
      // elimino il cart item dal cart
      const index = this.cart.cartItems.indexOf(item);
      this.cart.cartItems.splice(index, 1);
      this.cart.total -=
        this.discountPipe.transform(
          item.variation.price,
          item.variation.discount
        ) * item.quantity;

      this.cartItem.next(this.cart);
      localStorage.setItem("cart", JSON.stringify(this.cart));
      return of(this.cart.cartItems);
    } else {
      return this.http.delete(`${environment.apiUrl}/cart/${item.id}`).pipe(
        map((res: ICartItem[]) => {
          const total = res.reduce((acc, cartItem) => {
            return (
              acc +
              this.discountPipe.transform(
                cartItem.variation.price,
                cartItem.variation.discount
              ) *
                cartItem.quantity
            );
          }, 0);
          this.cartItem.next({ total: total, cartItems: res });
          return res;
        })
      );
    }
  }

  emptyCart() {
    if (!this.authService.isLoggedIn()) {
      localStorage.removeItem("cart");
      this.cart = { total: 0, cartItems: [] };
      this.cartItem.next(this.cart);
    } else {
      return this.http.delete(`${environment.apiUrl}/cart`).pipe(
        map(() => {
          this.cart = { total: 0, cartItems: [] };
          this.cartItem.next(this.cart);
        })
      );
    }
  }
}
