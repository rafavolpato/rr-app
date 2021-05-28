import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/order/order.service';
import { MyordersService } from './myorders.service';
import { Order } from 'app/order/order.model';

@Component({
  selector: 'mt-myorders',
  templateUrl: './myorders.component.html'
})
export class MyordersComponent implements OnInit {

  orders: Order[]
  orderShowed: boolean[] = []
  orderLoaded: boolean[] = []

  constructor(private myordersService: MyordersService) {}

  ngOnInit(): void {
    this.myordersService.getOrders()
      .subscribe(orders => {
        this.orders = orders
        this.orders.forEach(element => {
          this.orderShowed.push(false)
          this.orderLoaded.push(false)
        });
      });
  }

  showOrder(i: number){
    if (!this.orderLoaded[i]) {
      this.orderShowed[i] = true
      this.orderLoaded[i] = true
    }else{
      this.orderShowed[i] = !this.orderShowed[i]
    }
    console.log(this.orderShowed[i])
  }

}
