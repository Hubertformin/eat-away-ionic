import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {CartComponent} from './cart.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../shared/shared.module';
import {CheckoutComponent} from './checkout/checkout.component';


@NgModule({
  declarations: [CartComponent, CheckoutComponent],
    imports: [
        CommonModule,
        IonicModule,
        CartRoutingModule,
        SharedModule
    ]
})
export class CartModule { }
