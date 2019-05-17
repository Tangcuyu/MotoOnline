import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


import { FilterComponent } from './filter/filter.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const components = [
  FilterComponent,
  ProductDetailComponent,
  ProductListComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    LayoutsModule,
    RouterModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    components
  ]
})
export class ProductModule { }
