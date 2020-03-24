import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }
  /*
  * notify
  * */
  async notify(message, duration = 2000, color = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'top',
      animated: true
    });
    toast.present();
  }
  /*
  * notification with header*/
  async notifyWithHeader(header, message, duration = 2000) {
    const toast = await this.toastController.create({
      header,
      message,
      duration,
      position: 'top',
      animated: true
    });
    toast.present();
  }
  /*toast for firebase errors*/
  notifyFirebaseError(err, duration = 2000) {
    return this.notify(err.message ? err.message : 'Unknown error, please try later', duration);
  }
}
