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
  NbSelectModule,
  NbSpinnerModule,
  NbDatepickerModule
} from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { RecepcionistaRoutingModule } from './recepcionista-routing.module';
import { CalendarioRecepcaoComponent } from './calendario/calendario.component';
import { FormsModule } from '@angular/forms';
import { LegendasComponent } from './legendas/legendas.component';
import { AgendarConsultaComponent } from './agendar-consulta/agendar-consulta.component';
import { AlterarStatusComponent } from './alterar-status/alterar-status.component';
import { DetalhesConsultaComponent } from './detalhes-consulta/detalhes-consulta.component';
import { CalendarCustomDayCellComponent } from './calendario/day-cell.component';

const MODAIS = [
  LegendasComponent,
  AgendarConsultaComponent,
  AlterarStatusComponent,
  DetalhesConsultaComponent
];

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    RecepcionistaRoutingModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbLayoutModule,
    NbIconModule,
    NbActionsModule,
    NbTooltipModule,
    NbCalendarModule,
    NbRadioModule,
    FormsModule,
    NbCalendarRangeModule,
    NbSelectModule,
    NbDatepickerModule.forRoot()
  ],
  declarations: [
    CalendarioRecepcaoComponent,
    CalendarCustomDayCellComponent,
    ...MODAIS
  ],
  entryComponents: [
    ...MODAIS
  ]
})
export class RecepcionistaModule { }
