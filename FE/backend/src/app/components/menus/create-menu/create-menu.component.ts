import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Category, ISubCategory } from 'src/app/shared/interfaces/interface';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss'],
})
export class CreateMenuComponent implements OnInit {
  subcategories: ISubCategory[] = [];
  closeResult: string;
  isEdit: boolean = false;
  categories: Category[] = [];

  subcategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    id_category: ['', [Validators.required]],
  })

  constructor(
    private categoryService: CategoryService,
    private modal: NgbModal,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.categoryService.getAllSubCategories().subscribe((res) => {
      this.subcategories = res;
    });
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
    const discount = this.subcategories.find((res) => {
      return (res.id = subCategoryId);
    });
    this.subcategoryForm.patchValue(discount);
    console.log(this.subcategoryForm.value);
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
    this.categoryService.updateSubCategory(this.subcategoryForm.value).subscribe((res) => {
      this.subcategories = this.subcategories.map((sub) => {
        return sub.id == res.id ? res : sub;
      })
    })
  }

  onDelete(subCategoryId: number) {
    // this.categoryService.deleteSubCategory(subCategoryId).subscribe((res) => {
    //   //TODO: da testare
    // })
  }
}
