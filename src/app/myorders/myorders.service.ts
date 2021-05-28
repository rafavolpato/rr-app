import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import {MEAT_API} from '../app.api'
import {ErrorHandler} from '../app.error-handler'
import { Order } from 'app/order/order.model'
import { OrderItems } from 'app/order/order-items/order-items.model'


import { DataService } from 'app/shared/data/data.service'
import { LoginService } from 'app/security/login/login.service'

@Injectable()
export class MyordersService {
  private orderPost: Order;

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private loginService: LoginService
  ){}

  getOrders(): Observable<Order[]> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }

    return this.http.get<Order[]>(`${MEAT_API}compra/`, {headers:headers})
  }

  getItensCompra(orderId: number): Observable<OrderItems[]> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }

    return this.http.get<OrderItems[]>(`${MEAT_API}itemCompra/?idCompra=${orderId}`, {headers:headers})
  }

}
