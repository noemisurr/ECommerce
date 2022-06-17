import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IContact } from "src/app/shop/interfaces/interface";
import { environment } from "src/environments/environment";

@Injectable()
export class ContactService {
  public contact: IContact;

  constructor(private http: HttpClient) {}

  getContact(): Observable<void> {
    return this.http
      .get<IContact>(`${environment.apiUrl}/backoffice/settings`)
      .pipe(
        map((res) => {
          this.contact = res[0];
        })
      );
  }
}
