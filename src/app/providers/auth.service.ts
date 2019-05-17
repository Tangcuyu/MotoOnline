/* 使用邮件和密码的方式进行用户身份验证服务 */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs/';
import { EventEmitter } from '@angular/core';
import { UserCheckService } from './user-check.service';
import { User } from '../models/model';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  store the URL so we can redirect after logging in.
  redirectUrl = '';
  userProfile: User;
  change: EventEmitter<string>;


  constructor(private userCheck: UserCheckService, private router: Router) {
    this.change = new EventEmitter();
  }

  public login(formAuth: User): Observable<any> {
    return this.userCheck.checkUser(formAuth);
  }

  public isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate([this.redirectUrl]);
  }

  public getToken() {
    return localStorage.getItem('token');
  }

}
