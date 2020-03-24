import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import localeCMEN from '@angular/common/locales/en-CM';
import localeCMENExtra from '@angular/common/locales/extra/en-CM';
import localeCMFR from '@angular/common/locales/fr-CM';
import localeCMFRExtra from '@angular/common/locales/extra/fr-CM';
import {registerLocaleData} from '@angular/common';
import { StoreModule } from '@ngrx/store';
import {cartReducer} from './@store/reducers/cart.reducer';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {IonicStorageModule} from '@ionic/storage';

// register locales
registerLocaleData(localeCMEN, 'en-CM', localeCMENExtra);
registerLocaleData(localeCMFR, 'fr-CM', localeCMFRExtra);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule.enablePersistence(),
      AngularFireAuthModule,
      IonicStorageModule.forRoot(),
    StoreModule.forRoot({
      cart: cartReducer
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: LOCALE_ID, useValue: 'en-CM'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
