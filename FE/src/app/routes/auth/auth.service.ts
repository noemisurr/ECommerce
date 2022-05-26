import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {email, password})
  }

  register(name: string, email: string, password: string ) {
    return this.http.post<any>(`${environment.apiUrl}/auth/registration`, {name, email, password})
  }
}


