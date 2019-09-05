import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule,
  NbSpinnerModule,
  NbToastrService,
  NbToastrModule,
  NbLayoutModule
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
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule.forRoot(),
  NbSpinnerModule,
  NbToastrModule,
  NbLayoutModule
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
    PerfilPacientesComponent,
    LinkColComponent
  ]
})
export class PacientesModule { }
