import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IMediaHome } from "../interfaces/home.interface";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getAllMedia() {
    return this.http.get<IMediaHome[]>(`${environment.apiUrl}/backoffice/settings_home`);
  }
}
