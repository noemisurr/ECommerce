import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IDiscount } from 'src/app/shared/interfaces/interface';
import { listCouponsDB } from 'src/app/shared/tables/list-coupon';
import { DiscountService } from '../service/discount.service';

@Component({
  selector: 'app-list-coupon',
  templateUrl: './list-coupon.component.html',
  styleUrls: ['./list-coupon.component.scss'],
})
export class ListCouponComponent implements OnInit {
  public discounts: IDiscount[] = [];
  public selected = [];
  public closeResult: string;
  isEdit: boolean = false;

  discountForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    value: ['', Validators.required],
    active: ['', Validators.required],
  });

  constructor(
    private discountService: DiscountService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  open(content) {
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.discountService.getAll().subscribe((res) => {
      this.discounts = res;
    });
  }

  onEdit(content, id: number) {
    this.isEdit = true;
    const discount = this.discounts.find((res) => {
      return (res.id = id);
    });
    this.discountForm.patchValue(discount);
    console.log(this.discountForm.value);
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onUpdate() {
    this.discountService.edit(this.discountForm.value).subscribe((res) => {
      this.discounts = this.discounts.map((discount) => {
        return discount.id == res.id ? res : discount;
      });
      this.modal.dismissAll();
      this.discountForm.reset();
      this.message.create('success', `Discount updated succesfully`);
      this.isEdit = false;
    });
  }

  onSave() {
    this.discountService.new(this.discountForm.value).subscribe((res) => {
      this.discounts = [...this.discounts, res];
      this.modal.dismissAll();
      this.discountForm.reset();
      this.message.create('success', `Discount created succesfully`);
    });
  }

  onDelete(id: number) {
    this.discountService.delete(id).subscribe((res) => {
      this.message.create(
        'success',
        `Discount ${res.name} deleted succesfully`
      );
      this.discounts = this.discounts.filter((discount) => {
        return discount.name != res.name;
      });
    });
  }
}
