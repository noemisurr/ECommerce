import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {
  ICategory,
  Color,
  ISubCategory
} from 'src/app/shared/interfaces/interface';
import { ProductService } from '../../services/product.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss'],
})
export class DigitalAddComponent implements OnInit {
  categories: ICategory[] = [];
  subcategories: ISubCategory[] = [];
  colors: Color[] = [];
  selectedIndex = 0;

  productForm = this.fb.group({
    name: ['', [Validators.required]],
    short_description: ['', [Validators.required]],
    long_description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    material: ['', [Validators.required]],
    size: ['', [Validators.required]],
    other: [''],
    id_category: ['', [Validators.required]],
    id_subcategory: [{value: '', disabled: true}, [Validators.required]],
    variations: this.fb.array([
      this.fb.group({
        name: ['Choose Variation Name', [Validators.required]],
        id_color: ['', [Validators.required]],
        media: this.fb.array([new FormControl()]),
        tag_names: this.fb.array([new FormControl()]),
      }),
    ])
  });

  get variations() {
    return (this.productForm.get('variations') as FormArray).controls
  }

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {}

  public config1: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  ngOnInit() {
    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.productService.getAllColors().subscribe((res) => {
      this.colors = res;
    });
  }

  onSave() {
    console.log(this.productForm.value)
    this.productService.create(this.productForm.value).subscribe((res) => {
      const modal = this.modal.success({
        nzTitle: 'Product Created',
      });
  
      setTimeout(() => modal.destroy(), 2000);
    });
  }

  onCategoryChange(event) {
    this.productService.getSubById(event.target.value).subscribe((res) => {
      this.subcategories = res
      res.length == 0 ? this.productForm.get('id_subcategory').disable() : this.productForm.get('id_subcategory').enable()
    })
  }

  addUrl(index: number) {
    ((this.productForm.get('variations') as FormArray).at(index).get('media') as FormArray).insert(0, new FormControl(''));
  }

  deleteUrl(variationIndex, index) {
    ((this.productForm.get('variations') as FormArray).at(variationIndex).get('media') as FormArray).removeAt(index);
  }

  addTag(index: number) {
    ((this.productForm.get('variations') as FormArray).at(index).get('tag_names') as FormArray).insert(0, new FormControl(''));
  }

  deleteTag(variationIndex, index) {
    ((this.productForm.get('variations') as FormArray).at(variationIndex).get('tag_names') as FormArray).removeAt(index);
  }

  onReset() {
    this.productForm.reset();
  }

  closeTab({ index }: { index: number }) {
    (this.productForm.get('variations') as FormArray).removeAt(index)
  }

  newTab(): void {
    (this.productForm.get('variations')as FormArray).push(this.fb.group({
      name: ['Choose Variation Name', [Validators.required]],
      id_color: ['', [Validators.required]],
      media: this.fb.array([new FormControl()]),
      tag_names: this.fb.array([new FormControl()]),
    }))

    this.selectedIndex = (this.productForm.get('variations') as FormArray).length
  }
}
