import {Injectable} from '@angular/core'

import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import {ShoppingCartService} from '../campanha-detalhes/shopping-cart/shopping-cart.service'
import {CartItem} from '../campanha-detalhes/shopping-cart/cart-item.model'


import {MEAT_API} from '../app.api'

import {LoginService} from '../security/login/login.service'
import { Order } from './order.model'
import { DataService } from 'app/shared/data/data.service'


@Injectable()
export class OrderService {
  private orderPost: Order;

  constructor(private cartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService,
    private dataService: DataService
  ){}

  cartItemsValue(): number {
    return this.cartService.total()
  }

  cartItems(): CartItem[]{
    return this.cartService.carrinho
  }

  increaseQty(produto: CartItem){
    this.cartService.increaseQty(produto)
  }

  decreaseQty(produto: CartItem){
    this.cartService.decreaseQty(produto)
  }

  remove(produto: CartItem){
    this.cartService.removeProduto(produto)
  }

  clear(){
    this.cartService.clear()
  }

  checkOrder(cartItems: CartItem[]): Observable<string> {
    let compra = cartItems[0].orderItems.idCompra
    compra.estado = 2
    compra.data = this.dataService.dataHoje()
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.put<string>(`${MEAT_API}compra/${compra.idCompra}/`,
    compra, {headers:headers})
  }

}
