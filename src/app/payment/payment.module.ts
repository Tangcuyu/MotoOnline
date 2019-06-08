import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { PaymentComponent } from './payment.component';

const components = [
  PaymentComponent
];

@NgModule({
  declarations: [components],
  imports: [
    RouterModule,
    SharedModule,
    TranslateModule
  ],
  exports: [components]
})
export class PaymentModule { }
