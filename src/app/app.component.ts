import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import {StorageService} from './providers/storage.service';
import {DbService} from './providers/db.service';
import {DevicesModel} from './models/data';

const { PushNotifications, Device } = Plugins;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private db: DbService
  ) {
      /// TODO: Uncomment initialize app
      // this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
        // set statusbar
        this.statusBar.backgroundColorByHexString('#498A0F');
        // this.statusBar.styleDefault();
        this.splashScreen.hide();
        // register notifications
        this.registerNotifications();
    });
  }
  // register notifications
  async registerNotifications() {
    const user = await this.storageService.getCurrentUser();
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then( result => {
      if (result) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
    PushNotifications.addListener('registration',
        async (token: PushNotificationToken) => {
          // alert('Push registration success, token: ' + token.value);
          const deviceToken = await this.storageService.getNotificationToken();
          if (!deviceToken) {
              const device: DevicesModel = {
                  uid: user.id,
                  token: token.value,
              };
              // get device info
              await Device.getInfo()
                  .then((info) => {
                      device.deviceInfo = {model: info.model, operatingSystem: info.operatingSystem};
                  }).catch(() => {});
              // add device to db
              this.db.addDevice(device);
              // get token from db, to make sure it doesn't exist
              this.storageService.setNotificationToken(token.value);
          }
        }
    );
    PushNotifications.addListener('registrationError',
        (error: any) => {
          // alert('Error on registration: ' + JSON.stringify(error));
        }
    );
    PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          // alert('Push received: ' + JSON.stringify(notification));
        }
    );
    PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          // alert('Push action performed: ' + JSON.stringify(notification));
        }
    );
  }
}
