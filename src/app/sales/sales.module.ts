import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CheckoutCartComponent } from '../sales/checkout-cart/checkout-cart.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { HomeModule } from '../home/home.module';
import { SharedModule } from '../shared/shared.module';


const components = [
  CheckoutCartComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    HomeModule,
    LayoutsModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    components
  ]
})
export class SalesModule { }
