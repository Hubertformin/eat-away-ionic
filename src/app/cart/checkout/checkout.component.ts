import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {CartService} from '../../providers/cart.service';
import {CartItem, UserModel} from '../../models/data';
import {StorageService} from '../../providers/storage.service';
import {DbService} from '../../providers/db.service';
import {LoadingController} from '@ionic/angular';
import {ToastService} from '../../providers/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  appName = environment.appName;
  cartItems: CartItem[] = [];
  currentUser: UserModel;
  isLoading: boolean;

  constructor(public cartService: CartService,
              private loadingController: LoadingController,
              private toast: ToastService,
              private router: Router,
              private storage: StorageService, private db: DbService) {
  }

  ionViewDidEnter() {
    this.cartItems = this.cartService.getAll();
    // get current user
    this.storage.getCurrentUser()
        .then(user => {
          this.currentUser = user;
        });
  }

  ngOnInit() {}
  /*
  * save orders
  * */
  async saveOrder() {
    // add loaders
    // toggle loader
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    // adding to database
    this.db.addOrder({
      customerId: this.currentUser.id,
      customer: {
        id: this.currentUser.id,
        name: this.currentUser.name,
        email: this.currentUser.email,
        phoneNumber: this.currentUser.phoneNumber
      },
      date: new Date(),
      items: this.cartItems,
      status: 'PENDING',
      totalAmount: this.cartService.getTotalAmount() + 1000
    }).then(() => {
      // route back to home
      this.router.navigate(['/tabs/orders'])
          .finally(() => {
            // reset cart
            this.cartService.reset();
            this.toast.notifyWithHeader('Order complete', 'We will contact you shortly', 3500);
          });
    }).catch(() => {
      this.toast.notify('Error placing order, Please try again later');
    })
        .finally(() => {
          this.isLoading = false;
          loading.dismiss();
        });
  }

}
