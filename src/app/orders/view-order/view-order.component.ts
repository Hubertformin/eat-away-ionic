import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {DbService} from '../../providers/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderModel} from '../../models/data';
import {AlertController} from '@ionic/angular';
import {ToastService} from '../../providers/toast.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
    appName = environment.appName;
    order: OrderModel;

  constructor(private db: DbService,
              private alertController: AlertController,
              private router: Router,
              private toast: ToastService,
              private route: ActivatedRoute) { }

  ngOnInit() {}
  ionViewDidEnter() {
    this.route.queryParams
        .subscribe(query => {
          this.order = JSON.parse(query.order);
        });
  }
  /*actions*/
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
                                console.error(err);
                                this.toast.notify('Failed to cancel order');
                                order.status = 'PENDING';
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
                            .then(() => {
                                this.router.navigate(['/tabs/orders']);
                            })
                            .catch(err => {
                                this.toast.notify('Failed to delete this order');
                            });
                    }
                }
            ]
        });
        await alert.present();
    }

}
