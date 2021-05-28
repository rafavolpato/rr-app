import { OrderItems } from 'app/order/order-items/order-items.model'

export class MyorderItems {
  constructor(public orderItems: OrderItems){}

  value(): number {
    return this.orderItems.valor * this.orderItems.qtd
  }
}
