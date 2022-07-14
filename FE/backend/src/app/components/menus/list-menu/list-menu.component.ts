import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from 'src/app/shared/interfaces/interface';
import { menuDB } from 'src/app/shared/tables/menu';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit {
  categories: ICategory[] = []
  closeResult: string;
  isEdit: boolean = false;

  categoryForm = this.fb.group({
    name: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private modal: NgbModal) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res
    })
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

  onCreate() {}

  onEdit(content, subCategoryId: number) {
    this.isEdit = true;
    const discount = this.categories.find((res) => {
      return (res.id = subCategoryId);
    });
    this.categoryForm.patchValue(discount);
    console.log(this.categoryForm.value);
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

  onUpdate() {}

  onDelete(subCategoryId: number) {}

}
