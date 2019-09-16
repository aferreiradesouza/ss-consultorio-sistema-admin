import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { AgendaDoDiaComponent } from './agenda-do-dia/agenda-do-dia.component';
import { MedicoRoutingModule } from './medico-routing.module';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    MedicoRoutingModule,
    NbSpinnerModule
  ],
  declarations: [
    AgendaDoDiaComponent
  ]
})
export class MedicoModule { }
