import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/pages/account/services/auth.service";
import { environment } from "src/environments/environment";
import { IWishList } from "../../interfaces/interface";

@Injectable({
  providedIn: "root",
})
export class WishListService {
  private wishlists = new BehaviorSubject<IWishList>(null)
  public wishlist$ = this.wishlists.asObservable()

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  addToWishList(id: number, callback?: string): Observable<IWishList> {
    if(!this.authService.isLoggedIn()){
      console.log(this.authService.isLoggedIn())
      this.router.navigateByUrl(`/pages/login?callback=${callback}`);
    }
    return this.http.post(`${environment.apiUrl}/wishlist`, {
      id_variation: id,
    }).pipe(map((res: IWishList) => {
      this.wishlists.next(res)
      return res
    }));
  }

  getByWishList(): Observable<IWishList[]> {
    if(!this.authService.isLoggedIn()){
      return of(null)
    }
    return this.http.get<IWishList[]>(`${environment.apiUrl}/wishlist`);
  }

  removeByWishList(id: number) {
    return this.http.delete<IWishList>(`${environment.apiUrl}/wishlist/${id}`);
  }
}
