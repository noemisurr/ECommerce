import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IOrder[]>(`${environment.apiUrl}/order`)
  }

  getById(id: number) {
    return this.http.get<IOrder>(`${environment.apiUrl}/order/${id}`)
  }

  update(order) {
    return this.http.put<IOrder>(`${environment.apiUrl}/order/${order.id}`, order)
  }
}
