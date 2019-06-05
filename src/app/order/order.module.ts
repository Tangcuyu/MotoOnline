import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


import { LayoutsModule } from '../layouts/layouts.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';


const components = [
  OrderComponent
];

@NgModule({
  declarations: [components],
  imports: [
    SharedModule,
    LayoutsModule,
    OrderRoutingModule,
    TranslateModule
  ],
  exports: [
    components
  ]
})
export class OrderModule {}
