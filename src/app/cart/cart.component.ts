import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CartItem} from '../models/data';
import {environment} from '../../environments/environment';
import {CartService} from '../providers/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems: CartItem[] = [];
  appName = environment.appName;
  totalAmount = 0;

  constructor(public cartService: CartService, private ref: ChangeDetectorRef) { }

  ionViewDidEnter() {
      this.cartItems = this.cartService.getAll();
      // compute cart total
      this.getCartTotal();
  }

    addQuantity(index: number) {
      this.cartItems[index].quantity += 1;
      // compute cart total
      this.getCartTotal();
    }
    reduceQuantity(index: number) {
      if (this.cartItems[index].quantity === 1) { return; }
      this.cartItems[index].quantity -= 1;
      // get cart total
      this.getCartTotal();
  }

    removeFromCart(item: CartItem) {
      // remove item
        this.cartService.remove(item);
        // get cart items
        this.cartItems = this.cartService.getAll();
    }

    private getCartTotal() {
        this.totalAmount = 0;
        this.cartItems.forEach(it => {
            this.totalAmount += it.quantity * it.unitPrice;
        });
    }
}
