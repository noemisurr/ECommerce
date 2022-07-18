import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

interface JWT {
  aud: string,
  exp: number,
  iat: number,
  iss: string,
  nbf: number,
  user_id: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate();
  }

  canActivateChild() {
    return this.authenticate()
  }

  private authenticate(): boolean | UrlTree {
    console.log('AUTH')
    const jwt = localStorage.getItem('jwt')
    if(jwt) {
      var decoded: JWT = jwt_decode(jwt);
      if (Date.now() >= decoded.exp * 1000) {
        return this.router.parseUrl('/pages/login');
      }else{
        return true
      }
    }else {
      return this.router.parseUrl('/pages/login')
    }
    
  }
  
}