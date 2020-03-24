import { Injectable } from '@angular/core';
import {CartItem, ItemModel} from '../models/data';



@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  // tslint:disable-next-line:variable-name
  private _cart: CartItem[] = [];
  constructor() { }
  /**
   * @method addToCart
   * @param item: item to be added
   */
  addToCart(item: ItemModel) {
    if (!this.isAddedToCart(item.id)) {
      this._cart.push({
        id: item.id,
        name: item.name,
        unitPrice: item.unitPrice,
        units: item.units,
        quantity: 1,
        imageUrl: item.imageUrl,
        totalAmount: item.unitPrice
      });
    }
  }
  /**
   * @method removeFromCart
   * @param itemId: item id to be removed
   * @description remove specific item from cart
   */
  removeFromCart(itemId: string) {
    this._cart = this._cart.filter(ct => ct.id !== itemId);
  }
  /**
   * @method isAddedToCart
   * @param itemId: item id
   * @return status {boolean}
   * @description Check if item was added to cart
   */
  isAddedToCart(itemId): boolean {
    return !!this._cart.find(ct => ct.id === itemId);
  }
  /**
   * @method cart
   * @description Getter for cart array
   */
  get cart() {
    return this._cart;
  }
  /**
   * @method changeQuantity
   * @param id: item id,
   * @param val: quantity to be modified
   * @description modify quantity of cart items
   */
  changeQuantity(id: string, val: number) {
    const item = this._cart.find(ct => ct.id === id);
    item.quantity = val;
    item.totalAmount = item.unitPrice * val;
  }
  /**
   * @method totalAmount
   * @description get total cart amount
   */
  get totalAmount(): number {
    let total = 0;
    this._cart.forEach(ct => {
      total += ct.totalAmount;
    });
    return total;
  }
}
