import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces/interface';
import * as chartData from '../../shared/data/chart';
import { doughnutData, pieData } from '../../shared/data/chart';
import { OrderService } from '../vendors/service/order.service';
import { GeneralService } from './service/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  general
  orders: IOrder[] = []
  cartItems = []
  public doughnutData = doughnutData;
  public pieData = pieData;
  constructor(private generalService: GeneralService, private oderService: OrderService) {}

  ngOnInit() {
    this.generalService.index().subscribe((res) => {
      this.general = res
    })
    this.oderService.getAll().subscribe((res) => {
      this.orders = res.slice(0, 5)
      console.log(this.orders)
    })
    this.generalService.cartItems().subscribe((res) => {
      this.cartItems = res.slice(0, 6)
      console.log(this.cartItems)
    })
  }

}
