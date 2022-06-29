import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICategory } from 'src/app/shop/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CategoryService {
  public categories: ICategory[]

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http
    .get<ICategory[]>(`${environment.apiUrl}/categories`)
    .pipe(
      map((res) => {
        this.categories = res;
      })
    );
  }
}
