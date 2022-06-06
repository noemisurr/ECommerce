import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() {
  return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
    map((res) => 
      console.log(res)
      
    )
  )
  }
}
