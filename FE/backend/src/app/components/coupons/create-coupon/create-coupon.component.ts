import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  NgbDateStruct,
  NgbDate,
  NgbCalendar,
  NgbDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { IOrder } from 'src/app/shared/interfaces/interface';
import { OrderService } from '../../vendors/service/order.service';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
})
export class CreateCouponComponent implements OnInit {
  public model: NgbDateStruct;
  public date: { year: number; month: number };
  public modelFooter: NgbDateStruct;

  order: IOrder

  constructor(
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit() {
    this.orderService.getById(this.route.snapshot.queryParams.id).subscribe((res) => {
      this.order = res
    })
  }
}
