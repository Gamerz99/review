import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';
import { ReportComponent } from './report/report.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'add_category/:id',
        component: AddComponent,
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CategoryRoutingModule {
}

