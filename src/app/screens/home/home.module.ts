import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {SearchResultsComponent} from './search-results/search-results.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        { path: '', component: HomeComponent },
        { path: 'search', component: SearchResultsComponent }
        ]),
    SharedModule
  ],
  declarations: [HomeComponent, SearchResultsComponent]
})
export class HomeModule {}
