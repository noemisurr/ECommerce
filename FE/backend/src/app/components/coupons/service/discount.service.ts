import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IDiscount[]>(`${environment.apiUrl}/backoffice/discount`)
  }

  new(discount: IDiscount) {
    return this.http.post<IDiscount>(`${environment.apiUrl}/backoffice/discount`, discount)
  }

  delete(id: number) {
    return this.http.delete<IDiscount>(`${environment.apiUrl}/backoffice/discount/${id}`)
  }

  edit(discount: IDiscount) {
    return this.http.put<IDiscount>(`${environment.apiUrl}/backoffice/discount/${discount.id}`, discount)
  }
}
