import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbSpinnerModule, NbSelectModule, NbIconModule, NbListModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { AgendaDoDiaComponent } from './agenda-do-dia/agenda-do-dia.component';
import { MedicoRoutingModule } from './medico-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtendimentoComponent } from './atendimento/atendimento.component';

const MODULES = [
  NbSelectModule,
  NbIconModule,
  NbListModule,
  NbButtonModule
];

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    MedicoRoutingModule,
    NbSpinnerModule,
    ...MODULES,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AgendaDoDiaComponent,
    AtendimentoComponent
  ]
})
export class MedicoModule { }
