import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { ListagemPacientesComponent } from './listagem/listagem.component';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    PacientesRoutingModule,
  ],
  declarations: [
    ListagemPacientesComponent
  ]
})
export class PacientesModule { }
