import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbSelectModule, NbCheckboxModule, NbSpinnerModule, NbUserModule, NbToastrModule, NbTabsetModule, NbListModule, NbIconModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { CadastrosRoutingModule } from './cadastros-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProntuariosComponent } from './prontuarios/prontuarios.component';

const PAGES = [
  ProntuariosComponent
];

const CELL_TABLE = [
];

const MODAIS = [
];

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule,
  NbDialogModule.forRoot(),
  NbSelectModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbUserModule,
  NbCheckboxModule,
  NbToastrModule,
  NbTabsetModule,
  NbListModule,
  NbIconModule,
  NbDatepickerModule,
  NbInputModule
];

@NgModule({
  imports: [
    SharedModule,
    CadastrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NB_MODULES
  ],
  declarations: [
    ...CELL_TABLE,
    ...PAGES,
    ...MODAIS
  ],
  entryComponents: [
    ...CELL_TABLE,
    ...MODAIS
  ]
})
export class CadastrosModule { }
