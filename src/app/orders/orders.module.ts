import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersComponent} from './orders.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ViewOrderComponent} from './view-order/view-order.component';



@NgModule({
  declarations: [OrdersComponent, ViewOrderComponent],
    imports: [
        IonicModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {path: '', component: OrdersComponent},
            {path: 'view-order', component: ViewOrderComponent}
            ]),
        SharedModule
    ]
})
export class OrdersModule { }
