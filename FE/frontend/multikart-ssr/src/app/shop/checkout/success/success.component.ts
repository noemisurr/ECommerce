import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrder } from '../../interfaces/interface';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit{

  orderDetail: IOrder
  currentDate: Date = new Date()
  loader: boolean = true;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.loader) {
      this.orderService.getOrderDetail(this.route.snapshot.queryParams.order).subscribe((res) => {
        this.orderDetail = res
        this.loader = false;
      })
    }	
  }
}
