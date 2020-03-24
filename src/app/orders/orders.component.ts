import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {StorageService} from '../providers/storage.service';
import {DbService} from '../providers/db.service';
import {OrderModel, UserModel} from '../models/data';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ToastService} from '../providers/toast.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
    appName = environment.appName;
    orders: OrderModel[];
    currentUser: UserModel;
    getCustomers$;
    showErrorPage = false;

  constructor(private storageService: StorageService,
              private alertController: AlertController,
              private router: Router,
              private toast: ToastService,
              private loadingController: LoadingController,
              private db: DbService) { }

  ngOnInit() {}

  async ionViewDidEnter() {
      this.showErrorPage = false;
      // get current user
      this.currentUser = await this.storageService.getCurrentUser();
    // if no orders are loader, load from database
      const loader = await this.loadingController.create({
          message: 'Please wait..'
      });
      await loader.present();
      // get orders
      this.getCustomers$ = this.db.getOrdersByCustomerId(this.currentUser.id)
          .subscribe(orders => {
              this.orders = orders;
              // close loader
              loader.dismiss();
          }, (err) => {
              // console.error(err);
              this.showErrorPage = true;
              loader.dismiss();
          });
  }
  /* navigat and show detailed order*/
    showDetailedOrder(order: OrderModel) {
        this.router.navigate(['/tabs/orders/view-order'], {queryParams: {order: JSON.stringify(order)}});
    }

    async markAsCancel(order: OrderModel) {
        const alert = await this.alertController.create({
            header: 'Cancel Order?',
            message: 'Your order will no longer be processed',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                }, {
                    text: 'Yes',
                    handler: () => {
                        if (order.status === 'ACTIVE') {
                            this.toast.notify('Cannot cancel this order');
                            return;
                        }
                        order.status = 'CANCELLED';
                        this.db.updateOrder(order)
                            .catch(err => {
                                this.toast.notify('Failed to cancel order');
                            });
                    }
                }
            ]
        });
        await alert.present();
    }

    async delete(id: string) {
      const alert = await this.alertController.create({
          header: 'Delete this item?',
          message: 'This action is not reversible',
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary'
                  }, {
                    text: 'Okay',
                    handler: () => {
                        this.db.deleteOrder(id)
                            .catch(err => {
                                this.toast.notify('Failed to delete this order');
                            });
                    }
                }
            ]
        });
      await alert.present();
    }
    /* when page is about to be left*/
    ionViewWillLeave() {
        this.getCustomers$.unsubscribe();
    }
}
