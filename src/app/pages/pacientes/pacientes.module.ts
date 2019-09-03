import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule,
  NbSpinnerModule,
  NbToastrService,
  NbToastrModule
} from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { ListagemPacientesComponent } from './listagem/listagem.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdicionarPacientesComponent } from './adicionar/adicionar.component';
import { EditarPacientesComponent } from './editar/editar.component';

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule.forRoot(),
  NbSpinnerModule,
  NbToastrModule
];

@NgModule({
  imports: [
    ...NB_MODULES,
    SharedModule,
    PacientesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListagemPacientesComponent,
    AdicionarPacientesComponent,
    EditarPacientesComponent
  ],
  entryComponents: [
    EditarPacientesComponent
  ]
})
export class PacientesModule { }
