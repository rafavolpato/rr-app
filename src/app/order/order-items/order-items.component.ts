import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CartItem } from '../../campanha-detalhes/shopping-cart/cart-item.model'

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() cartItems: CartItem[]

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }

  emitIncreaseQty(produto: CartItem){
    this.increaseQty.emit(produto)
  }

  emitDecreaseQty(produto: CartItem){
    this.decreaseQty.emit(produto)
  }

  emitRemove(produto: CartItem){
    this.remove.emit(produto)
  }

}
