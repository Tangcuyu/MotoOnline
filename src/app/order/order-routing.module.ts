import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../providers/auth-guard.service';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [AuthGuardService],
    data: { backimg: '../../assets/img/moto/bj2.jpg'},
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'order' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
