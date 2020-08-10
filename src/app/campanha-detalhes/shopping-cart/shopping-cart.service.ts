import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {CartItem} from './cart-item.model'
import {ProdutoCampanha} from '../produto-campanha/produto-campanha.model'

import {NotificationService} from '../../shared/messages/notification.service'
import { LoginService } from 'app/security/login/login.service'
import {MEAT_API} from '../../app.api'
import {Observable} from 'rxjs/Observable'
import { Router } from '@angular/router';
import { OrderItems, OrderItemsPost } from 'app/order/order-items/order-items.model'
import { Order } from 'app/order/order.model'
import { DataService } from 'app/shared/data/data.service'


@Injectable()
export class ShoppingCartService {
  carrinho: CartItem[] = []
  order: Order

  constructor(private notificationService: NotificationService,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
    ) {}

  clear() {
    this.carrinho = []
    this.order = undefined
  }

  addProduto(produto: ProdutoCampanha) {
    let foundProduto = this.procuraProduto(produto)
    if (this.order === undefined) {
      this.order = new Order (
        0,
        undefined,
        1,
        this.dataService.dataHoje()
      )
    }

    this.order.idPessoa = this.loginService.pessoa

    let orderItems: OrderItems = {
      idItemCompra: foundProduto === undefined ? 0 : foundProduto.orderItems.idItemCompra,
      idCompra: this.order,
      idProdutoCampanha: produto,
      qtd: foundProduto ? foundProduto.orderItems.qtd + 1 : 1,
      valor: produto.valor
    }

    this.postProduto(orderItems, foundProduto !== undefined)
      .subscribe(
      orderAdded => {
        this.order = orderAdded.idCompra
        orderItems.idItemCompra = orderAdded.idItemCompra
        if (foundProduto) {
          foundProduto.orderItems.qtd = foundProduto.orderItems.qtd + 1
        } else {
          this.carrinho.push(new CartItem(orderAdded))
        }
      },
      response => {
        this.notificationService.notify('Erro ao adicionar o produto!' + response.error)},
      () => {
        this.notificationService.notify(`Você adicionou o produto ${produto.nomeProduto}`)
      });
  }

  procuraProduto(produto: ProdutoCampanha): CartItem {

    if (!this.loginService.isLoggedIn || this.loginService.pessoa === undefined) {
      this.router.navigate(['/login'])
      return
    }

    let foundProduto = this.carrinho.find((mProduto) =>
    mProduto.orderItems.idProdutoCampanha.idProdutoCampanha === produto.idProdutoCampanha)
    return foundProduto
  }

  postProduto (orderItems: OrderItems, found: boolean): Observable<OrderItems> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    if (!found) {
      return this.http.post<OrderItems>(`${MEAT_API}itemCompra/`, orderItems, {headers: headers})
    } else {
      return this.http.put<OrderItems>(`${MEAT_API}itemCompra/${orderItems.idItemCompra}/`,
      orderItems, {headers: headers})
    }
  }

  increaseQty(produto: CartItem) {
    this.addProduto(produto.orderItems.idProdutoCampanha)
  }

  decreaseQty(produto: CartItem) {
    let foundProduto = this.procuraProduto(produto.orderItems.idProdutoCampanha)

    let orderPost: OrderItemsPost = {
      idItemCompra: foundProduto ? foundProduto.orderItems.idItemCompra : 0,
      idCompra: 0,
      idProdutoCampanha: produto.orderItems.idProdutoCampanha.idProdutoCampanha,
      qtd: foundProduto.orderItems.qtd - 1,
      valor: produto.orderItems.valor
    }

    if (produto.orderItems.qtd === 1) {
      this.removeProduto(produto)
    } else {
      this.postProduto(produto.orderItems, true)
      .subscribe(
      orderAdded => {},
      response => {
        this.notificationService.notify('Erro ao reduzir a quantidade de produto!' + response.error)},
      () => {
        foundProduto.orderItems.qtd = foundProduto.orderItems.qtd - 1
        this.notificationService.notify(`Você reduziu a quantidade do produto ${foundProduto.orderItems.idProdutoCampanha.nomeProduto}`)
      });
    }
  }

  removeProduto(produto: CartItem) {
    this.deleteProduto(produto.orderItems)
      .subscribe(
      ok => {},
      response => {
        this.notificationService.notify('Erro ao remover o produto!' + response.error)},
      () => {
        this.notificationService.notify(`Produto removido!}`)
      });
    this.carrinho.splice(this.carrinho.indexOf(produto), 1)
//    this.notificationService.notify(`Você removeu o produto ${produto.order.produtoCampanha.nomeProduto}`)
  }

  deleteProduto (order: OrderItems): Observable<any> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.delete<OrderItems>(`${MEAT_API}itemCompra/${order.idItemCompra}/`, {headers: headers})
  }

  total(): number {
    return this.carrinho
      .map(produto => produto.value())
      .reduce((prev, value) => prev + value, 0)
  }

  limparCarrinho() {
    if (this.carrinho.length > 0) {
      this.deleteCarrinho()
        .subscribe(
          ok => {
            this.clear()
          },
          response => {
            this.notificationService.notify('Erro ao limpar o carrinho!' + response.error)},
          () => {
            this.clear()
            this.notificationService.notify(`Carrinho vazio!}`)
          }
        );
      }
  }

  deleteCarrinho (): Observable<any> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.delete<OrderItems>(`${MEAT_API}carrinho/limpar/`,
     {headers: headers})
  }

  atualizarCarrinho (): Observable<OrderItems[]> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.delete<OrderItems[]>(`${MEAT_API}carrinho/atualizar/`,
     {headers: headers})
  }

}
