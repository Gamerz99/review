import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './game.component';
import { ReportComponent } from './report/report.component';
import { AddGameComponent } from './add_game/add-game.component';

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
        path: 'add_game',
        component: AddGameComponent,
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

