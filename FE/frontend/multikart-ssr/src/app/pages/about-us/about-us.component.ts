import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrder } from 'src/app/shop/interfaces/interface';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  order: IOrder
  loader: boolean = true

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.loader) {
      this.orderService.getOrderDetail(this.route.snapshot.queryParams.id).subscribe((res) => {
        this.order = res
        console.log(res)
        this.loader = false
      }, (err) => {
        this.loader = false
      })

    }
  }

}
