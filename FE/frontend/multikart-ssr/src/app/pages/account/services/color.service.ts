import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IColor } from "src/app/shop/interfaces/interface";
import { environment } from "src/environments/environment";

@Injectable()
export class ColorService {
  colors: IColor[];

  constructor(private http: HttpClient) {}

  getAllColors(): Observable<void> {
    return this.http.get<IColor[]>(`${environment.apiUrl}/colors`).pipe(
      map((res) => {
        this.colors = res;
      })
    );
  }
}
