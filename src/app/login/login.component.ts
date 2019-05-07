import { Component, OnInit } from '@angular/core';
// Import OAuthservice from angular-oauth2-oidc
// import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../providers/auth.service';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}
