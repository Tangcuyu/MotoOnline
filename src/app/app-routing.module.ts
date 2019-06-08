// Third party imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Application imports
import { AuthGuardService } from './providers/auth-guard.service';
import { CheckoutCartComponent } from './sales/checkout-cart/checkout-cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { OrderComponent } from './order/order.component';
import { PagenotfoundComponent } from './layouts/pagenotfound/pagenotfound.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {backimg: '../../assets/img/moto/bj-1.jpeg'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {backimg: '../../assets/img/cover.jpeg'}
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {backimg: '../../assets/img/moto/bj-1.jpeg'}
  },
  {
    path: 'checkout',
    component: CheckoutCartComponent,
    data: {backimg: '../../assets/img/moto/bj-2.jpeg'}
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent,
    data: {backimg: '../../assets/img/moto/bj-3.jpeg'}
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
