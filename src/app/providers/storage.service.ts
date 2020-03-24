import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {UserModel} from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
  /*
  * clear storage
  * */
  clear(key: string = null) {
    if (key) {
      return this.storage.remove(key);
    } else {
      return this.storage.clear();
    }
  }
  /*
  * profile properties
  * */
  setUserAccount(user: UserModel) {
    return this.storage.set('currentUser', JSON.stringify(user));
  }
  /*
  * get current user
  * */
  getCurrentUser(): Promise<UserModel> {
    return this.storage.get('currentUser')
        .then(user => JSON.parse(user));
  }
  /*notifications token*/
  setNotificationToken(token: string) {
    return this.storage.set('notificationToken', token);
  }
  getNotificationToken(): Promise<string> {
    return this.storage.get('notificationToken');
  }
  /*
  * orders
  * */
}
