import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'app/order/order.model';
import { MyordersService } from '../myorders.service';
import { OrderItems } from 'app/order/order-items/order-items.model'


@Component({
  selector: 'mt-myorder-items',
  templateUrl: './myorder-items.component.html'
})
export class MyorderItemsComponent implements OnInit {

  @Input() order: Order
  @Input() show: boolean
  itensCompra: OrderItems[]

  constructor(private myordersService: MyordersService) {}

  ngOnInit(): void {
    this.myordersService.getItensCompra(this.order.idCompra)
      .subscribe(itensCompra => {
        this.itensCompra = itensCompra
        console.log(itensCompra)
      });

  }

  total(): number {
    return this.itensCompra
    .map(produto => produto.qtd * produto.valor)
    .reduce((prev, value) => prev + value, 0)
  }

}
