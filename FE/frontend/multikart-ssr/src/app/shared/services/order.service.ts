import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/shop/interfaces/interface';
import { environment } from 'src/environments/environment';

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }

  newOrder(total: number, addressId: number, cardId: number) {
    // ORDER DETAIL:: total, id_address
    // ORDER ITEM:: quantity, id_variation //me lo prendo dal carrello
    // PAYMENT:: total, id_card 
    return this.http.post<IOrder>(`${environment.apiUrl}/order`, {total: total, id_address: addressId, id_card: cardId })
  }

  getOrderDetail(id: number) {
    return this.http.get<IOrder>(`${environment.apiUrl}/order/${id}`);
  }

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return <Observable<any>>itemsStream;
  }

  // Create order
  public createOrder(product: any, details: any, orderId: any, amount: any) {
    var item = {
        shippingDetails: details,
        product: product,
        orderId: orderId,
        totalAmount: amount
    };
    state.checkoutItems = item;
    // localStorage.setItem("checkoutItems", JSON.stringify(item));
    // localStorage.removeItem("cartItems");
    this.router.navigate(['/shop/checkout/success', orderId]);
  }
  
}
