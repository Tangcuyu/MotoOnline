import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { TranslateModule } from '@ngx-translate/core';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule
  ],
  declarations: [
    LoginComponent,
    UserAuthComponent,
    LogoutComponent
  ],
  exports: [
    LoginComponent,
    UserAuthComponent,
    LogoutComponent
  ]
})
export class LoginModule { }
