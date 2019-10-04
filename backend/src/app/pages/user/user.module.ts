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
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ReportComponent } from './report/report.component';
import { AddComponent } from './add_user/add.component';
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
    UserRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
    FormsModule,
    NbSpinnerModule
  ],
  declarations: [
    UserComponent,
    ReportComponent,
    AddComponent
  ],
})
export class UserModule { }
