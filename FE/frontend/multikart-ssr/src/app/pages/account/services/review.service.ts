import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IReview } from 'src/app/shop/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getById(id: string) {
    return this.http.get<IReview[]>(`${environment.apiUrl}/products/${id}/reviews`)
  }

  add(review) {    
    return this.http.post<IReview>(`${environment.apiUrl}/products/${review.id_product}/reviews`, review )
  }
}
