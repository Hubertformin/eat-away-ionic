import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CartItem} from '../models/data';
import { Store} from '@ngrx/store';
import * as CartActions from '../@store/actions/cart.actions';
import {AppState} from '../@store/app.state';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: Observable<CartItem[]>;
  cartItems: CartItem[] = [];
  constructor(
      private store: Store<AppState>,
      private toastController: ToastController,
      private router: Router
  ) {
    // @ts-ignore
    this.cart$ = this.store.select('cart');
    this.cart$.subscribe((data: CartItem[]) => {
      this.cartItems = data;
    });
  }
  /*
  * Get observable reference
  * */
  get ref() {
    return this.cart$;
  }
  /*
  * Get items from cart
  * */
  getAll() {
    return this.cartItems;
  }
  /*
  * Add item to cart
  * */
  add(item: CartItem) {
    this.cartItems.push(item);
    this.store.dispatch(new CartActions.UpdateCart(this.cartItems));
    // show toast
    this.showAddedToast(item.name);
  }
  /*
  * Remove item from cart
  * */
  remove(item: CartItem) {
    this.cartItems = this.cartItems.filter(c => c.id !== item.id);
    this.store.dispatch(new CartActions.UpdateCart(this.cartItems));
  }
  /**
   * @method isAddedToCart
   * @param itemId: item id
   * @return status {boolean}
   * @description Check if item was added to cart
   */
  isAddedToCart(itemId): boolean {
    return !!this.cartItems.find(ct => ct.id === itemId);
  }
  /*
  * reset cart
  * */
  reset() {
    this.cartItems = [];
    this.store.dispatch(new CartActions.ResetCart());
  }
  /*
  * get total amount of items in cart
  * */
  getTotalAmount(): number {
    let total = 0;
    this.cartItems.forEach(ct => {
      total += ct.totalAmount;
    });
    return total;
  }
  /*
  * toast controller
  * */
  async showAddedToast(name: string) {
    const toast = await this.toastController.create({
      message: name + ' added to cart',
      // position: 'bot',
      duration: 2500,
      buttons: [
        {side: 'start', icon: 'checkmark-circle'},
        {
          side: 'end',
          text: 'View',
          handler: () => {
            this.router.navigate(['/tabs/cart']);
          }
        }
      ]
    });
    toast.present();
  }
}
