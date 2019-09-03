import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbDialogModule, NbSpinnerModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { ListagemPacientesComponent } from './listagem/listagem.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { AdicionarPacientesComponent } from './adicionar/adicionar.component';

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbDialogModule.forRoot(),
  NbSpinnerModule
]

@NgModule({
  imports: [
    ...NB_MODULES,
    SharedModule,
    PacientesRoutingModule,
    FormsModule
  ],
  declarations: [
    ListagemPacientesComponent,
    AdicionarPacientesComponent
  ]
})
export class PacientesModule { }
