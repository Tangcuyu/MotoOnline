import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomeModule } from '../home/home.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const components = [
  ProductDetailComponent
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
export class ProductModule { }
