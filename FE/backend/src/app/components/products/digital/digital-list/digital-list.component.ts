import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Color,
  ICategory,
  ISubCategory,
} from 'src/app/shared/interfaces/interface';
import { ProductService } from '../../services/product.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss'],
})
export class DigitalListComponent implements OnInit {
  categories: ICategory[] = [];
  subcategories: ISubCategory[] = [];
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
    brand: ['', [Validators.required]],
    material: ['', [Validators.required]],
    size: ['', [Validators.required]],
    other: [''],
    id_category: ['', [Validators.required]],
    id_subcategory: ['', [Validators.required]],
    variations: this.fb.array([]),
  });

  get variations() {
    return (this.productForm.get('variations') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm.disable();
    this.productService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.productService.getAllSubCategory().subscribe((res) => {
      this.subcategories = res;
    });
    this.productService.getAllColors().subscribe((res) => {
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
          brand: res.brand,
          material: res.material,
          size: res.size,
          other: res.other,
          id_category: res.id_category,
          id_subcategory: res.id_subcategory,
        });
        res.variations.forEach((variation, i) => {
          const variationGroup = this.productForm.get(
            'variations'
          ) as FormArray;
          variationGroup.push(
            this.fb.group({
              id: variation.id,
              name: variation.name,
              id_discount: variation.id_discount,
              id_color: variation.id_color,
              media: this.fb.array([]),
              tag_names: this.fb.array([]),
            })
          );
          variationGroup.disable();

          const media = (this.productForm.get('variations') as FormArray)
            .at(i)
            .get('media') as FormArray;

          variation.media.forEach((img) => {
            media.push(new FormControl(img.url));
            media.disable();
          });

          if (variation.media.length == 0) {
            media.push(new FormControl());
          }

          const tag_name = (this.productForm.get('variations') as FormArray)
            .at(i)
            .get('tag_names') as FormArray;

          variation.tag_names.forEach((res) => {
            tag_name.push(new FormControl(res));
            tag_name.disable();
          });

          if (variation.tag_names.length == 0) {
            tag_name.push(new FormControl());
          }
        });
      });
  }

  onCategoryChange(event) {
    this.productService.getSubById(event.target.value).subscribe((res) => {
      this.subcategories = res;
      res.length == 0
        ? this.productForm.get('id_subcategory').disable()
        : this.productForm.get('id_subcategory').enable();
    });
  }

  onEdit() {
    this.edit = true;
    this.productForm.enable();
  }

  onSave() {
    this.edit = false;
    this.productForm.disable();
    this.productService
      .updateProduct(this.productForm.value)
      .subscribe((res) => {
        const modal = this.modal.success({
          nzTitle: 'Product Updated',
        });

        setTimeout(() => modal.destroy(), 2000);
      });
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
        .get('tag_names') as FormArray
    ).insert(0, new FormControl(''));
  }

  deleteTag(variationIndex, index) {
    (
      (this.productForm.get('variations') as FormArray)
        .at(variationIndex)
        .get('tag_names') as FormArray
    ).removeAt(index);
  }

  onDelete() {
    this.productService.delete(this.productForm.get('id').value).subscribe(() => {
      const modal = this.modal.success({
        nzTitle: 'Product Deleted',
      });
      this.router.navigateByUrl('/products/list')

      setTimeout(() => {
        modal.destroy();
      }, 2000);
    });
    this.productForm.reset();
  }

  closeTab({ index }: { index: number }) {
    (this.productForm.get('variations') as FormArray).removeAt(index);
  }

  newTab(): void {
    (this.productForm.get('variations') as FormArray).push(
      this.fb.group({
        name: [
          this.productForm.get('name').value + ' ...',
          Validators.required,
        ],
        id_color: ['', [Validators.required]],
        media: this.fb.array([new FormControl()]),
        tag_names: this.fb.array([new FormControl()]),
      })
    );

    this.selectedIndex = (
      this.productForm.get('variations') as FormArray
    ).length;
  }
}
