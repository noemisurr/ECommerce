import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListMenuComponent,
        data: {
          title: "Categories Lists",
          breadcrumb: "Categories Lists"
        }
      },
      {
        path: 'sub',
        component: CreateMenuComponent,
        data: {
          title: "Sub Categories Lists",
          breadcrumb: "Sub Categories Lists"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
