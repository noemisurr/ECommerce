import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/interface';
import { vendorsDB } from '../../../shared/tables/vendor-list';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-list-vendors',
  templateUrl: './list-vendors.component.html',
  styleUrls: ['./list-vendors.component.scss']
})
export class ListVendorsComponent implements OnInit {

  orders: IOrder[]

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAll().subscribe((res) => {
      this.orders = res
    })
  }

}
