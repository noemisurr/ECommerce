import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CarouselComponent } from 'ngx-owl-carousel-o';
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
  searchedCategories: ICategory[] = []
  closeResult: string;
  isEdit: boolean = false;
  searchValue = '';
  visible = false;

  categoryForm = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private modal: NgbModal, private message: NzModalService) {}

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res
      this.searchedCategories = [...this.categories]
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
    this.categoryService.createCategory(this.categoryForm.value).subscribe((res) => {
      const modal = this.message.success({
        nzTitle: 'Category Created',
      });

      this.modal.dismissAll();
      this.categoryForm.reset();
  
      setTimeout(() => modal.destroy(), 2000);
      this.categories.push(res)
      this.categories = [...this.categories]
    })
  }

  onEdit(content, subCategoryId: number) {
    this.isEdit = true;
    const category = this.categories.filter((res) => {
      return res.id == subCategoryId;
    });
    this.categoryForm.patchValue(category[0]);
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.categoryForm.reset()
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onUpdate() {
    this.categoryService.updateCategory(this.categoryForm.value).subscribe((res) => {
      this.categories = this.categories.map((cat) => {
        return cat.id == res.id ? res : cat;
      })
      this.modal.dismissAll();
      this.categoryForm.reset();
      this.message.success({
        nzTitle: 'Category Updated',
      });
      this.isEdit = false;
    })
  }

  onDelete(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe((res) => {
      this.categories = this.categories.filter((cat) => {
        return cat.id != res.id
      })
      const modal = this.message.success({
        nzTitle: 'Category Deleted',
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
    this.searchedCategories = this.categories.filter((item) => item.name.indexOf(this.searchValue) !== -1);
  }

}
