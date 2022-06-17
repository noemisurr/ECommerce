import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../interfaces/auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLogged = new BehaviorSubject<boolean>(Boolean(localStorage.getItem('jwt')));
  public isLogged$ = this.isLogged.asObservable();

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.isLogged.value;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    }).pipe(map((res: User) => {
      this.isLogged.next(true)
      return res
    }));
  }

  register(
    name: string,
    surname: string,
    email: string,
    password: string,
    telephone?: string,
    birth?: string
  ) {
    return this.http.post<User>(`${environment.apiUrl}/auth/registration`, {
      name,
      surname,
      email,
      password,
      telephone,
      birth,
      id_user_type: 2,
    });
  }

  me() {
    return this.http.get<User>(`${environment.apiUrl}/auth/me`);
  }

  logout() {
    localStorage.removeItem('jwt')
    return this.http.post('http://localhost:8000/api/auth/logout', {}).pipe(map((res) => {
      this.isLogged.next(false)
    }))
  }

  updateUser(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/auth/me`, user);
  }

  getToken() {
    return localStorage.getItem("jwt");
  }
}
