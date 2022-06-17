import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, Color } from 'src/app/shared/interfaces/interface';
import { ProductService } from '../../services/product.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss'],
})
export class DigitalListComponent implements OnInit {
  categories: Category[] = [];
  colors: Color[] = [];
  selectedIndex = 0;
  edit: boolean = false;

  productForm = this.fb.group({
    id: [''],
    created_at: [''],
    deleted: [''],
    name: ['', [Validators.required]],
    short_description: ['', [Validators.required]],
    long_description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    id_category: ['', [Validators.required]],
    variations: this.fb.array([]),
  });

  get variations() {
    return (this.productForm.get('variations') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.productForm.disable();
    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.productService.getAllColors().subscribe((res) => {
      console.log(res)
      this.colors = res;
    });
    this.productService
      .getProductById(this.route.snapshot.queryParams.id)
      .subscribe((res) => {
        this.productForm.patchValue({
          id: res.id,
          created_at: res.created_at,
          deleted: res.deleted,
          name: res.name,
          short_description: res.short_description,
          long_description: res.long_description,
          price: res.price,
          id_category: res.id_category,
        });
        res.variations.forEach((variation, i) => {
          const variationGroup = this.productForm.get('variations') as FormArray;
          variationGroup.push(this.fb.group({
            id: variation.id,
            id_discount: variation.id_discount,
            id_color: variation.id_color,
            media: this.fb.array([]),
            tag: this.fb.array([]),
          }));
          // variationGroup.disable()

          variation.media.forEach((img) => {
            const media = (this.productForm.get('variations') as FormArray).at(i).get('media') as FormArray
            media.push(new FormControl(img.url))
            // media.disable()
          })

          variation.tag.forEach((res) => {
            const tag = (this.productForm.get('variations') as FormArray).at(i).get('tag') as FormArray
            tag.push(new FormControl(res.id_tag))
            // tag.disable()
          })
        });
      });
  }

  onEdit() {
    this.edit = true;
    this.productForm.enable()
    // enable - disable - poi muore
  }

  onSave() {
    this.edit = false;
    this.productForm.disable()
    this.productService.updateProduct(this.productForm.value).subscribe((res) => {
      const modal = this.modal.success({
        nzTitle: 'Product Updated',
      });
  
      setTimeout(() => modal.destroy(), 2000);
    })
  }

  addUrl(index: number) {
    (
      (this.productForm.get('variations') as FormArray)
        .at(index)
        .get('media') as FormArray
    ).insert(0, new FormControl(''));
  }

  deleteUrl(variationIndex, index) {
    (
      (this.productForm.get('variations') as FormArray)
        .at(variationIndex)
        .get('media') as FormArray
    ).removeAt(index);
  }

  addTag(index: number) {
    (
      (this.productForm.get('variations') as FormArray)
        .at(index)
        .get('tag') as FormArray
    ).insert(0, new FormControl(''));
  }

  deleteTag(variationIndex, index) {
    (
      (this.productForm.get('variations') as FormArray)
        .at(variationIndex)
        .get('tag') as FormArray
    ).removeAt(index);
  }

  onDelete() {
    // this.productForm.reset();
  }

  closeTab({ index }: { index: number }) {
    (this.productForm.get('variations') as FormArray).removeAt(index);
  }

  newTab(): void {
    (this.productForm.get('variations') as FormArray).push(
      this.fb.group({
        id_color: ['', [Validators.required]],
        media: this.fb.array([new FormControl()]),
        tag: this.fb.array([new FormControl()]),
      })
    );

    this.selectedIndex = (
      this.productForm.get('variations') as FormArray
    ).length;
  }
}
