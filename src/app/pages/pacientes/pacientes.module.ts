import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule,
  NbSpinnerModule,
  NbToastrModule,
  NbLayoutModule,
  NbTooltipModule,
  NbTabsetModule,
  NbActionsModule,
  NbSelectModule,
  NbCheckboxModule
} from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { ListagemPacientesComponent } from './listagem/listagem.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdicionarPacientesComponent } from './adicionar/adicionar.component';
import { EditarPacientesComponent } from './editar/editar.component';
import { LinkColComponent } from '../../shared/components/custom-table/link-col.component';
import { DeletarPacientesComponent } from './deletar/deletar.component';
import { PerfilPacientesComponent } from './perfil/perfil.component';

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule.forRoot(),
  NbSpinnerModule,
  NbToastrModule,
  NbLayoutModule,
  NbTabsetModule,
  NbActionsModule,
  NbTooltipModule,
  NbSelectModule,
  NbCheckboxModule
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
    EditarPacientesComponent,
    LinkColComponent,
    DeletarPacientesComponent,
    PerfilPacientesComponent
  ],
  entryComponents: [
    EditarPacientesComponent,
    DeletarPacientesComponent,
    LinkColComponent
  ]
})
export class PacientesModule { }
