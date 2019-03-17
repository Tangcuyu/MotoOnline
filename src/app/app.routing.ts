import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './login/user-auth/auth-guard.service';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { CheckoutCartComponent } from './containers/checkout-cart/checkout-cart.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
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
    HomeModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
