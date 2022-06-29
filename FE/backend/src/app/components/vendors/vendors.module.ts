import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { ListVendorsComponent } from './list-vendors/list-vendors.component';
import { CreateVendorsComponent } from './create-vendors/create-vendors.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { MediaRoutingModule } from '../media/media-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [ListVendorsComponent, CreateVendorsComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    MediaRoutingModule,
    DropzoneModule,
    NzTableModule,
    NzPopconfirmModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule
  ]
})
export class VendorsModule { }
