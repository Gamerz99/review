import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { ReportComponent } from './report/report.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    children: [
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'add_game/:id',
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
export class GameRoutingModule {
}

