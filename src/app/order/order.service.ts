import {Injectable} from '@angular/core'

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import {ShoppingCartService} from '../campanha-detalhes/shopping-cart/shopping-cart.service'
import {CartItem} from '../campanha-detalhes/shopping-cart/cart-item.model'


import {MEAT_API} from '../app.api'

import {LoginService} from '../security/login/login.service'
import { OrderPost } from './order.model'


@Injectable()
export class OrderService {
  private orderPost: OrderPost[] = [];

  constructor(private cartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService
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

    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }

    return this.http.put<string>(`${MEAT_API}compraBulk/`,
    cartItems, {headers:headers})

    // return this.http.post<Order>(`${MEAT_API}orders`, order, {headers:headers})
    //               .map(order => ' ') //order.address)
  }

}
