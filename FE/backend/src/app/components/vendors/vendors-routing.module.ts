import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListVendorsComponent } from './list-vendors/list-vendors.component';
import { CreateCouponComponent } from '../coupons/create-coupon/create-coupon.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListVendorsComponent,
    data: {
      title: 'Order List',
      breadcrumb: 'Order List',
    },
  },
  {
    path: 'detail',
    component: CreateCouponComponent,
    data: {
      title: 'Order Detail',
      breadcrumb: 'Order Detail',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
