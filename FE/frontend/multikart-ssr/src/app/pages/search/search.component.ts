import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { IOrder } from 'src/app/shop/interfaces/interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  orders: IOrder[] = []
  loader: boolean = true

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    if(this.loader){
      this.orderService.getUserOrders().subscribe((res) => {
        this.orders = res
        console.log(res)
        this.loader = false
      }, (err) => {
        this.loader = false
        this.router.navigateByUrl('/home')
      })

    }
  }

}
