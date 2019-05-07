import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { AuthService } from './auth.service';

@Injectable(
  {providedIn: 'root'}
)
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {

    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Store the attamped URL for redirecting
    // this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
