import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from './cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {CheckoutGuard} from '../guards/checkout.guard';


const routes: Routes = [
  {path: '', component: CartComponent},
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [CheckoutGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
