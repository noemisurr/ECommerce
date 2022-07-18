import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MenusRoutingModule } from './menus-routing.module';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [ListMenuComponent, CreateMenuComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    NgxDatatableModule,
    NzTableModule,
    NzPopconfirmModule,
    NzTabsModule,
    NzIconModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzDropDownModule
  ]
})
export class MenusModule { }
