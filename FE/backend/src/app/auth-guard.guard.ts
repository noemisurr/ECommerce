import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
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
    //TODO: controllare se il token è scaduto
    return localStorage.getItem('jwt') ? true : this.router.parseUrl('/auth/login')
  }
  
}
