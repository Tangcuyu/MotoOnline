import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule
  ],
  declarations: [
    LoginComponent,
    UserAuthComponent
  ],
  exports: [
    LoginComponent,
    UserAuthComponent
  ]
})
export class LoginModule { }
