import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartistModule } from 'ng-chartist'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ChartsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartistModule,
    ReportsRoutingModule,
    Ng2SmartTableModule,
    NzDropDownModule,
    NzTableModule,
    NzPopconfirmModule,
    NzTabsModule,
    NzIconModule,
    NzModalModule,
  ]
})
export class ReportsModule { }
