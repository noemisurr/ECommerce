import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory, ISubCategory } from 'src/app/shared/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/categories`)
  }

  createCategory(category: ICategory) {
    return this.http.post<ICategory>(`${environment.apiUrl}/categories`, category)
  }

  updateCategory(category: ICategory) {
    return this.http.post<ICategory>(`${environment.apiUrl}/categories/${category.id}`, category)
  }

  getAllSubCategories() {
    return this.http.get<ISubCategory[]>(`${environment.apiUrl}/sub_categories`)
  }

  createSubCategory(sub: ISubCategory) {
    return this.http.post<ISubCategory>(`${environment.apiUrl}/sub_categories`, sub)
  }

  updateSubCategory(sub: ISubCategory) {
    return this.http.post<ISubCategory>(`${environment.apiUrl}/sub_categories/${sub.id}`, sub)
  }

  deleteSubCategory(id: number) {
    return this.http.delete<ISubCategory>(`${environment.apiUrl}/sub_categories/${id}`)
  }
}
