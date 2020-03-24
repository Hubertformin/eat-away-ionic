import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountComponent} from './account/account.component';
import {AboutComponent} from './about/about.component';



@NgModule({
  declarations: [ProfileComponent, AccountComponent, AboutComponent],
    imports: [
        IonicModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(
            [
                {path: '', component: ProfileComponent},
                {path: 'account', component: AccountComponent},
                {path: 'about', component: AboutComponent},
            ]),
        ReactiveFormsModule
    ]
})
export class ProfileModule { }
