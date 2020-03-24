import {Component, OnInit} from '@angular/core';
import {CartService} from '../providers/cart.service';
import {CartItem} from '../models/data';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.ref.subscribe(data => {
      this.cartItems = data;
    });
  }
}
