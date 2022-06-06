import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalDataFactory } from 'ng2-completer';
import { User } from 'src/app/shared/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:8000/api/auth/login', {
      email,
      password,
    });
  }

  me() {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<User>('http://localhost:8000/api/auth/me', {
      headers: headers,
    });
  }

  logout() {
    localStorage.removeItem('jwt')
    return this.http.post('http://localhost:8000/api/auth/logout', {})
  }
}
