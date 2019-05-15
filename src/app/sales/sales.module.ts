import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomeModule } from '../home/home.module';
import { CheckoutCartComponent } from '../sales/checkout-cart/checkout-cart.component';

const components = [
  CheckoutCartComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    HomeModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    components
  ]
})
export class SalesModule { }
