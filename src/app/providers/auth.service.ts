/* 使用邮件和密码的方式进行用户身份验证服务 */
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs/';
import { delay, tap, map, catchError } from 'rxjs/operators';
import { UserCheckService } from './user-check.service';
import { User } from '../models/model';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  store the URL so we can redirect after logging in.
  redirectUrl: string;
  userProfile: User;

  constructor(private userCheck: UserCheckService, private router: Router) {
    // this.configureWithNewConfigApi();
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

  // Okta验证服务初始化配置
  /* private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.requestAccessToken = true;
    localStorage.setItem('requestAccessToken', '' + true);
    console.log('app component localStorage:' + localStorage.getItem('requestAccessToken'));
    // this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this.oauthService.events.subscribe(e => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });

    this.oauthService.events
      .pipe(filter(e => e.type === 'session_terminated'))
      .subscribe(e => {
        // tslint:disable-next-line:no-console
        console.debug('Your session has been terminated!');
      });

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(e => {
        // this.oauthService.loadUserProfile();
      });
  } */


  // 使用Okta的OpenID connect服务，验证登录
  /* public loginWithOkta() {
    this.oauthService.initImplicitFlow();
    console.log('authService component: okta-' + this.oauthService.hasValidIdToken());
  } */


  /* public get nameOkta() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) { return null };
    return claims['name'];
  } */

  /* loadUserProfile(): void {
    this.oauthService.loadUserProfile().then(up => (this.userProfile = up));
  } */
}
