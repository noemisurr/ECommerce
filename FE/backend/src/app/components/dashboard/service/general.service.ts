import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(`${environment.apiUrl}/backoffice/general`)
  }

  cartItems() {
    return this.http.get<any[]>(`${environment.apiUrl}/backoffice/general/cart`)
  }
}
