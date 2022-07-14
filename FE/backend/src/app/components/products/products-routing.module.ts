import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: DigitalSubCategoryComponent,
        data: {
          title: "Product List",
          breadcrumb: "List"
        }
      },
      {
        path: 'detail',
        component: DigitalListComponent,
        data: {
          title: "Product Detail",
          breadcrumb: "Detail"
        }
      },
      {
        path: 'new',
        component: DigitalAddComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      }
      // {
      //   path: 'physical/category',
      //   component: CategoryComponent,
      //   data: {
      //     title: "Category",
      //     breadcrumb: "Category"
      //   }
      // },
      // {
      //   path: 'physical/sub-category',
      //   component: SubCategoryComponent,
      //   data: {
      //     title: "Products",
      //     breadcrumb: "Products"
      //   }
      // },
      // {
      //   path: 'physical/product-list',
      //   component: ProductListComponent,
      //   data: {
      //     title: "Product List",
      //     breadcrumb: "Product List"
      //   }
      // },
      // {
      //   path: 'physical/product-detail',
      //   component: ProductDetailComponent,
      //   data: {
      //     title: "Product Detail",
      //     breadcrumb: "Product Detail"
      //   }
      // },
      // {
      //   path: 'physical/add-product',
      //   component: AddProductComponent,
      //   data: {
      //     title: "Add Products",
      //     breadcrumb: "Add Product"
      //   }
      // },
      // {
      //   path: 'digital/digital-category',
      //   component: DigitalCategoryComponent,
      //   data: {
      //     title: "Category",
      //     breadcrumb: "Category"
      //   }
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
