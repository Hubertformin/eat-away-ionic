import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {DevicesModel, ItemModel, OrderModel, UserModel} from '../models/data';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private usersCollection: AngularFirestoreCollection<UserModel>;
  private itemsCollection: AngularFirestoreCollection<ItemModel>;
  private ordersCollection: AngularFirestoreCollection<OrderModel>;
  private devicesCollection: AngularFirestoreCollection<DevicesModel>;
  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection('users');
    this.itemsCollection = afs.collection('items');
    this.ordersCollection = afs.collection('orders');
    this.devicesCollection = afs.collection('devices');
  }
  /*
  * Get ref
  * */
  get ref() {
    return this.afs;
  }
  /*
  * Get recent items
  * */
  getRecentItems(limit = 10) {
      return this.ref.collection<ItemModel>('items', ref =>
          ref.orderBy('orderCount', 'desc').limit(limit))
          .snapshotChanges()
          .pipe(map(actions => actions.map(action => {
              const id = action.payload.doc.id;
              const data = action.payload.doc.data() as ItemModel;
              const timestamp = action.payload.doc.get('date');
              data.date = timestamp.toDate();
              return {id, ...data};
          })));
  }
  /*
  * Get items from db
  * */
  getItems(limit = 25) {
      return this.ref.collection<ItemModel>('items', ref =>
          ref.orderBy('name', 'asc').limit(limit))
          .snapshotChanges()
          .pipe(map((actions) => actions.map(action => {
              const id = action.payload.doc.id;
              const data = action.payload.doc.data() as ItemModel;
              const timestamp = action.payload.doc.get('date');
              data.date = timestamp.toDate();
              return {id, ...data};
          })));
  }
  /*
  * Get user
  * */
  getUser(id: string): Observable<UserModel> {
    return this.usersCollection.doc(id).snapshotChanges()
        .pipe(map(action => {
          const uid = action.payload.id;
          const timestamp = action.payload.get('dateOfBirth');
          const data = action.payload.data() as UserModel;
          data.dateOfBirth = timestamp.toDate();
          return {id, ...data};
        }));
  }
  /*
  * Add user to collection
  * */
  addUser(user: UserModel) {
    return this.usersCollection.add(user);
  }
  /*
  * Set user
  * */
  setUser(uid: string, user: UserModel) {
    return this.usersCollection.doc(uid).set(user);
  }
  /*
  * Update user
  * */
  updateUser(uid: string, user: UserModel) {
    return this.usersCollection.doc(uid).update(user);
  }
  /*
  * Add device
  * */
  addDevice(deviceInfo: DevicesModel) {
    return this.devicesCollection.add(deviceInfo);
  }
  /*
  * Add order
  * */
  addOrder(order: OrderModel) {
    return this.ordersCollection.add(order);
  }
  /*get orders by customer id*/
  getOrdersByCustomerId(customerId, limit = 15) {
    return this.afs.collection<OrderModel>('orders', ref =>
        ref.where('customerId', '==', customerId).orderBy('date', 'desc').limit(limit))
        .snapshotChanges()
        .pipe(map(actions => actions.map(action => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data() as OrderModel;
          const timestap = action.payload.doc.get('date');
          data.date = timestap.toDate();
          return {id, ...data};
        })));
  }
  /*
  * Update order
  * */
  updateOrder(order: OrderModel) {
      return this.ordersCollection.doc(order.id).update(order);
  }
  /*
  * Delete order
  * */
  deleteOrder(id: string) {
      return this.ordersCollection.doc(id).delete();
  }
}
