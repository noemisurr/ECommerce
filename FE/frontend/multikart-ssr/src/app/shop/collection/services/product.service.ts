import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { environment } from "src/environments/environment";
import {
  IProduct,
  IProductResponse,
  IProductSpecial,
} from "../../interfaces/interface";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  /*
  ---------------------------------------------
  ----------------- Product -------------------
  ---------------------------------------------
  */

  getAll(skip: number, take: number, sortBy: string, obj: string, search: string, category: number, subcategory: number) {
    let queryString: string = `?skip=${skip}&take=${take}`
    if (sortBy) {
      queryString += `&sortBy=${sortBy}`
    }
    if (obj) {
      queryString += `&obj=${obj}`
    }
    if(search) {
      queryString += `&search=${search}`
    }
    if(category) {
      queryString += `&category=${category}`
    }
    if(subcategory) {
      queryString += `&subcategory=${subcategory}`
    }
    return this.http.get<IProductResponse>(
      `${environment.apiUrl}/products${queryString}`
    );
  }

  getAllSpecial() {
    return this.http.get<IProductSpecial>(
      `${environment.apiUrl}/products/special`
    );
  }

  getById(id: string) {
    return this.http.get<IProduct>(`${environment.apiUrl}/products/${id}`);
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 12
  ) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage < paginateRange - 1) {
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
}
