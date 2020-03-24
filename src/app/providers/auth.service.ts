import { Injectable } from '@angular/core';
import {UserModel} from '../models/data';
import {DbService} from './db.service';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import {FirebaseAuth} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private db: DbService) {
  }
  /*
  * authenticate user
  * */
  loginUser(email, password) {
      return this.db.ref.collection('users', ref =>
          ref.where('email', '==', email).where('password', '==', password))
          .snapshotChanges()
          .pipe(map(actions => actions.map(action => {
              const id = action.payload.doc.id;
              const timestamp = action.payload.doc.get('dateOfBirth');
              const data = action.payload.doc.data() as UserModel;
              data.dateOfBirth = timestamp.toDate();
              return {id, ...data};
          })));
  }
  /*
  * Create user
  * */
  createUser(user: UserModel): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
          .then(cUser => {
              // update auth paramets
              cUser.user.updateProfile({displayName: user.name});
              this.db.setUser(cUser.user.uid, user)
                .then(() => {
                  resolve({id: cUser.user.uid, ...user});
                }).catch(err => reject(err));
          })
          .catch(err => reject(err));
    });
  }
}
