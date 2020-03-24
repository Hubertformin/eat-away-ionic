import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { LocaleCurrencyPipe } from './pipes/locale-currency.pipe';
import {NetworkComponent} from './components/network/network.component';
import {ErrorPageComponent} from './components/error-page/error-page.component';



@NgModule({
  declarations: [LocaleCurrencyPipe, NetworkComponent, ErrorPageComponent],
  imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
  ],
    exports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        LocaleCurrencyPipe,
        NetworkComponent,
        ErrorPageComponent
    ]
})
export class SharedModule { }
