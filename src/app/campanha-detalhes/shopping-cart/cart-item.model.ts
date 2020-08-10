import { OrderItems } from 'app/order/order-items/order-items.model'

export class CartItem {
  constructor(public orderItems: OrderItems){}

  value(): number {
    return this.orderItems.valor * this.orderItems.qtd
  }
}
