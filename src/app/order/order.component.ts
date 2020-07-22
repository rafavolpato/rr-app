import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import {Router} from '@angular/router'

import {RadioOption} from '../shared/radio/radio-option.model'
import {OrderService} from './order.service'
import {CartItem} from '../campanha-detalhes/shopping-cart/cart-item.model'



@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      paymentOption: this.formBuilder.control('', [Validators.required])
    })
  }

  cartItemsValue(): number {
    return this.orderService.cartItemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(produto: CartItem){
    this.orderService.increaseQty(produto)
  }

  decreaseQty(produto: CartItem){
    this.orderService.decreaseQty(produto)
  }

  remove(produto: CartItem){
    this.orderService.remove(produto)
  }

  checkOrder(cartItems: CartItem[]){
//    order.orderItems = this.cartItems()
//      .map((produto:CartItem)=>new OrderItem(produto.quantity, produto.produtoCampanha.id))
      this.orderService.checkOrder(cartItems)
      .subscribe( (orderId: string) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()})
    // })
    // console.log(cartItems)
  }

}
