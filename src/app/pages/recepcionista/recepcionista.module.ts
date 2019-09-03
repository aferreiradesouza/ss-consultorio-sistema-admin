import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { RecepcionistaRoutingModule } from './recepcionista-routing.module';
import { CalendarioComponent } from './calendario/calendario.component';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    RecepcionistaRoutingModule,
  ],
  declarations: [
    CalendarioComponent
  ]
})
export class RecepcionistaModule { }
