import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { LoadingSpinnerComponent } from '../layouts/loading-spinner/loading-spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NetworkErrorComponent } from './network-error/network-error.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const components = [
  FooterComponent,
  HeaderComponent,
  LoadingSpinnerComponent,
  NavbarComponent,
  NetworkErrorComponent,
  PagenotfoundComponent,
  SubscribeComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    RouterModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    components
  ]
})
export class LayoutsModule { }
