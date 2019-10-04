import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ReportComponent } from './report/report.component';
import { AddGameComponent } from './add_game/add-game.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    GameRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule
  ],
  declarations: [
    GameComponent,
    ReportComponent,
    AddGameComponent
  ],
})
export class GameModule { }
