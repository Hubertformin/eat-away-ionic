import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SlidesComponent} from './slides.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [SlidesComponent],
  imports: [
    CommonModule,
      IonicModule,
      SharedModule,
      RouterModule.forChild([
        {path: '', component: SlidesComponent}
      ])
  ]
})
export class SlidesModule { }
