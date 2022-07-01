import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isEdit: boolean = false;

  generalForm = this.formBuilder.group({
    id: ['', Validators.required],
    total: ['', Validators.required],
    delivery_date: ['', Validators.required],
    shipping_date: ['', Validators.required],
    shipping_code: ['', Validators.required],
  })

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
      this.generalForm.patchValue({
        id: res.id,
        total: res.total,
        delivery_date: res.delivery_date,
        shipping_date: res.shipping_date,
        shipping_code: res.shipping_code
      })
      this.generalForm.disable()
      this.order = res
    })
  }

  onEdit() {
    this.isEdit = true;
    this.generalForm.enable()
  }

  onSave() {
    this.isEdit = false;
    this.generalForm.disable()
    this.orderService.update(this.generalForm.value).subscribe((res) => {
      console.log('OKKK')
      this.order = res
    })
  }

  onCancel() {
    this.isEdit = false;
    this.generalForm.disable()
  }
}
