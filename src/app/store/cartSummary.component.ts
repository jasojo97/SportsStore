import { Component } from '@angular/core'
import { Cart } from '../model/cart.model'

@Component({
  selector: 'cart-summary',
  templateUrl: 'cartSummary.component.html',
})
export class CartSummaryComponent {
  // the cart is injected by Angular
  constructor(public cart: Cart) {}
}
