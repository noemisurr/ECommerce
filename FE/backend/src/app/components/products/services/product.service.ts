import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color, ICategory, ISubCategory, ProductRequest, ProductResponse, VariationRequest } from 'src/app/shared/interfaces/interface';
import { environment } from 'src/environments/environment';
import { SubCategoryComponent } from '../physical/sub-category/sub-category.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // CATEGORY

  getAllCategories() {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/categories`);
  }

  // SUBCATEGORY

  getAllSubCategory() {
    return this.http.get<ISubCategory[]>(`${environment.apiUrl}/sub_categories`)
  }

  getSubById(idCategory: number) {
    return this.http.get<ISubCategory[]>(`${environment.apiUrl}/categories/${idCategory}`)
  }

  // PRODUCT

  getAll() {
    return this.http.get<ProductResponse[]>(`${environment.apiUrl}/products`);
  }

  create(product: ProductRequest) {
    return this.http.post<ProductResponse>(`${environment.apiUrl}/products`, product);
  }

  getProductById(id: string) {
    return this.http.get<ProductResponse>(`${environment.apiUrl}/products/${id}`);
  }

  updateProduct(product: ProductRequest) {
    return this.http.put<ProductResponse>(`${environment.apiUrl}/products/${product.id}`, product);
  }

  delete(productId: number) {
    return this.http.delete<ProductResponse>(`${environment.apiUrl}/products/${productId}`);
  }

  // VARIATION

  createVariation(variation: VariationRequest) {
    return this.http.post(`${environment.apiUrl}/products/${variation.id_product}`, variation);
  }

  getAllVariations(id: string) {
    return this.http.get(`${environment.apiUrl}/products/${id}/variations`);
  }

  // COLOR

  getAllColors() {
    return this.http.get<Color[]>(`${environment.apiUrl}/colors`);
  }

  // IMG

  createImg(media) {
    media.forEach((res) => {console.log(res.value)})
    // return this.http.post<Product>(`${environment.apiUrl}/img`, media);
  }
}
