import {Component, OnInit} from '@angular/core';
import {ItemModel, ITEMS_DATA} from '../models/data';
import {environment} from '../../environments/environment';
import {CartService} from '../providers/cart.service';
import {DbService} from '../providers/db.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
    searchVal = '';
    appName = environment.appName;
    recentItems: ItemModel[] = [];
    items: ItemModel[] = [];

  constructor(public cartService: CartService, private db: DbService, private router: Router) {}
  ionViewDidEnter() {
      this.db.getRecentItems()
          .subscribe(recent => {
              this.recentItems = recent;
          });
      // get items
      this.db.getItems(35)
          .subscribe(items => {
              this.items = items;
          });
  }
    onContentScroll($event: CustomEvent) {
      console.log($event);
    }
    /*
    * Add to cart*/
    addToCart(item: ItemModel) {
        this.cartService.add({
            id: item.id,
            imageUrl: item.imageUrl,
            name: item.name,
            unitPrice: item.unitPrice,
            units: item.units,
            quantity: 1,
            totalAmount: item.unitPrice
        });
    }
    /*
    * search items
    * */
    search($event: any) {
        console.log($event);
        this.router.navigate(['/tabs/home/search'], {queryParams: {query: $event.target.value}});
    }
}
