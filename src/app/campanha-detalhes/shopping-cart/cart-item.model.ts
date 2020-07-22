import { Order } from 'app/order/order.model'


export class CartItem {
  constructor(public order: Order){}

  value(): number {
    return this.order.valor * this.order.qtd
  }
}
