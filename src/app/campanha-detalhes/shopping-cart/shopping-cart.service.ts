import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {CartItem} from './cart-item.model'
import {ProdutoCampanha} from '../produto/produto-campanha.model'
import {Order, OrderPost} from 'app/order/order.model'
import {NotificationService} from '../../shared/messages/notification.service'
import { LoginService } from 'app/security/login/login.service'
import {MEAT_API} from '../../app.api'
import {Observable} from 'rxjs/Observable'
import { Router } from '@angular/router';

@Injectable()
export class ShoppingCartService {
  carrinho: CartItem[] = []

  constructor(private notificationService: NotificationService,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient){}

  clear(){
    this.carrinho = []
  }

  addProduto(produto:ProdutoCampanha){

    let foundProduto = this.procuraProduto(produto)

    let orderPost = new OrderPost (
      foundProduto === undefined ? 0 : foundProduto.order.idCompra,
      this.loginService.pessoa.id,
      produto.idProdutoCampanha,
      foundProduto ? foundProduto.order.qtd + 1 : 1,
      1, //estado inicial da compra
      produto.valor)

    let order = new Order (
      foundProduto === undefined ? 0 : foundProduto.order.idCompra,
      this.loginService.pessoa,
      produto,
      foundProduto ? foundProduto.order.qtd + 1 : 1,
      1, //estado inicial da compra
      produto.valor
    )

    this.postProduto(orderPost, foundProduto !== undefined)
      .subscribe(
      orderAdded => {
        order.idCompra = orderAdded.idCompra
      },
      response => {
        this.notificationService.notify('Erro ao adicionar o produto!' + response.error)},
      () => {
        if(foundProduto){
          foundProduto.order.qtd = foundProduto.order.qtd + 1
        }else{
          this.carrinho.push(new CartItem(order))
        }
        this.notificationService.notify(`Você adicionou o produto ${produto.nomeProduto}`)
      });
  }

  procuraProduto(produto:ProdutoCampanha): CartItem {

    if (!this.loginService.isLoggedIn || this.loginService.pessoa === undefined){
      this.router.navigate(['/login'])
      return
    }

    console.log(this.carrinho)
    console.log(produto)
    let foundProduto = this.carrinho.find((mProduto)=>
    mProduto.order.idProdutoCampanha.idProdutoCampanha === produto.idProdutoCampanha)
    console.log(foundProduto)
    return foundProduto
  }

  postProduto (orderPost: OrderPost, found: boolean): Observable<Order> {
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    console.log('achou')
    console.log(found)
    if (!found) {
      return this.http.post<Order>(`${MEAT_API}compra/`, orderPost, {headers:headers})
    }else{
      return this.http.put<Order>(`${MEAT_API}compra/${orderPost.idCompra}/`,
      orderPost, {headers:headers})
    }
  }

  increaseQty(produto: CartItem){
    this.addProduto(produto.order.idProdutoCampanha)
  }

  decreaseQty(produto: CartItem){
    let foundProduto = this.procuraProduto(produto.order.idProdutoCampanha)

    let orderPost = new OrderPost (
      foundProduto ? foundProduto.order.idCompra : 0,
      this.loginService.pessoa.id,
      produto.order.idProdutoCampanha.idProdutoCampanha,
      foundProduto.order.qtd - 1,
      1, //estado inicial da compra
      produto.order.valor)

    if (produto.order.qtd === 1){
      this.removeProduto(produto)
    }else{
      this.postProduto(orderPost, true)
      .subscribe(
      orderAdded => {},
      response => {
        this.notificationService.notify('Erro ao redizor a quantidade de produto!' + response.error)},
      () => {
        foundProduto.order.qtd = foundProduto.order.qtd - 1
        this.notificationService.notify(`Você reduziu em um o produto ${foundProduto.order.idProdutoCampanha.nomeProduto}`)
      });
    }
  }


  removeProduto(produto:CartItem){
    this.deleteProduto(produto.order)
      .subscribe(
      response => {
        this.notificationService.notify('Erro ao remover o produto!' + response.error)},
      () => {
        this.notificationService.notify(`Produto removido!}`)
      });
    this.carrinho.splice(this.carrinho.indexOf(produto), 1)
//    this.notificationService.notify(`Você removeu o produto ${produto.order.produtoCampanha.nomeProduto}`)
  }

  deleteProduto (order: Order): Observable<any>{
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.delete<Order>(`${MEAT_API}compra/${order.idCompra}/`, {headers:headers})
  }

  total(): number{
    return this.carrinho
      .map(produto => produto.value())
      .reduce((prev, value)=> prev+value, 0)
  }

  limparCarrinho() {
    if (this.carrinho.length > 0) {
      this.deleteCarrinho()
        .subscribe(
          ok => {this.clear()
            console.log('ok')},
          response => {
            console.log('erro')
          this.notificationService.notify('Erro ao limpar o carrinho!' + response.error)},
        () => {
          console.log('vazio')
          this.clear()
          this.notificationService.notify(`Carrinho vazio!}`)
        });
      }
  }

  deleteCarrinho (): Observable<any>{
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.delete<Order>(`${MEAT_API}carrinho/limpar/`,
     {headers: headers})
  }

  atualizarCarrinho (): Observable<Order[]>{
    let headers = new HttpHeaders()
    if (this.loginService.isLoggedIn()) {
      headers = headers
      .set('Authorization', `Bearer ${this.loginService.token.access}`)
    }
    return this.http.delete<Order[]>(`${MEAT_API}carrinho/atualizar/`,
     {headers: headers})
  }

}
