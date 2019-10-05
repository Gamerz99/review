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
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { ReportComponent } from './report/report.component';
import { AddComponent } from './add/add.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

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
    Ng2SmartTableModule,
    FormsModule,
    NbSpinnerModule
  ],
  declarations: [
    GameComponent,
    ReportComponent,
    AddComponent
  ],
})
export class GameModule { }
