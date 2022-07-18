import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ICategory, ISubCategory } from 'src/app/shared/interfaces/interface';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss'],
})
export class CreateMenuComponent implements OnInit {
  subcategories: ISubCategory[] = [];
  searchedSubcategories: ISubCategory[] = [];
  closeResult: string;
  isEdit: boolean = false;
  categories: ICategory[] = [];
  searchValue = '';
  visible = false;

  subcategoryForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    id_category: ['', [Validators.required]],
  })

  constructor(
    private categoryService: CategoryService,
    private modal: NgbModal,
    private fb: FormBuilder,
    private message: NzModalService
  ) {}

  ngOnInit() {
    this.categoryService.getAllSubCategories().subscribe((res) => {
      this.subcategories = res;
      this.searchedSubcategories = [...this.subcategories]
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

  onCreate() {
    this.categoryService.createSubCategory(this.subcategoryForm.value).subscribe((res) => {
      this.subcategories.push(res)
      this.searchedSubcategories = [...this.subcategories]
      this.subcategories = [...this.subcategories]
      const modal = this.message.success({
        nzTitle: 'Sub Category Created',
      });
  
      setTimeout(() => modal.destroy(), 2000);
    })  
  }

  onEdit(content, subCategoryId: number) {
    this.isEdit = true;
    const sub = this.subcategories.filter((res) => {
      return (res.id === subCategoryId);
    });
    this.subcategoryForm.patchValue(sub[0]);
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
      this.modal.dismissAll();
      this.subcategoryForm.reset();
      const modal = this.message.success({
        nzTitle: 'Sub Category Updated',
      });
      this.isEdit = false;
      setTimeout(() => modal.destroy(), 2000);
    })
  }

  onDelete(subCategoryId: number) {
    this.categoryService.deleteSubCategory(subCategoryId).subscribe((res) => {
      this.subcategories = this.subcategories.filter((sub) => {
        return sub.id != res.id
      })
      const modal = this.message.success({
        nzTitle: 'Sub Category Deleted',
      });
  
      setTimeout(() => modal.destroy(), 2000);
  
    })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.searchedSubcategories = this.subcategories.filter((item) => item.name.indexOf(this.searchValue) !== -1);
  }
}
