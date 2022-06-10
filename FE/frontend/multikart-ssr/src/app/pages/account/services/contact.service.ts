import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IContact } from "src/app/shop/interfaces/interface";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: 'root'
})

export class ContactService {
    constructor(private http: HttpClient) {}

    getContact() {
        return this.http.get<IContact>(`${environment.apiUrl}/backoffice/settings`);
    }
}