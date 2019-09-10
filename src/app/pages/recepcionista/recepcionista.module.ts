import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbSidebarModule,
  NbLayoutModule,
  NbIconModule,
  NbActionsModule,
  NbTooltipModule,
  NbCalendarModule,
  NbRadioModule,
  NbCalendarRangeModule,
  NbSelectModule
} from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { RecepcionistaRoutingModule } from './recepcionista-routing.module';
import { CalendarioRecepcaoComponent } from './calendario/calendario.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    RecepcionistaRoutingModule,
    NbSidebarModule,
    NbLayoutModule,
    NbIconModule,
    NbActionsModule,
    NbTooltipModule,
    NbCalendarModule,
    NbRadioModule,
    FormsModule,
    NbCalendarRangeModule,
    NbSelectModule
  ],
  declarations: [
    CalendarioRecepcaoComponent
  ]
})
export class RecepcionistaModule { }
