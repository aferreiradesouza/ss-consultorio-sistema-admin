import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbDialogModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbCalendarRangeModule,
  NbCalendarModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
  TextAreaSimpleComponent,
  ItemComponent,
  TimeLineComponent,
  CalendarioComponent
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  CpfPipe,
  DatePipe,
  TelefonePipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { FormatterService } from './services/formatter.service';
import { ValidatorService } from './services/validator.service';
import { InputSimpleComponent } from './components/input-simple/input-simple.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskComponent } from './components/input-mask/input-mask.component';
import { NgxMaskModule } from 'ngx-mask';
import { CepPipe } from './pipes/cep.pipe';
import { CalendarioService } from './services/calendarios.service';
import { EspecialidadeEnum } from './enums/especialidade.enum';
import { EspecialidadePipe } from './pipes/especialidade.pipe';
import { MedicoEnum } from './enums/medico.enum';
import { MedicoPipe } from './pipes/medico.pipe';
import { LugarPipe } from './pipes/lugar.pipe';
import { LugarEnum } from './enums/lugar.enum';
import { VisaoPipe } from './pipes/visao.pipe';
import { VisaoEnum } from './enums/visao.enum';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbDialogModule.forRoot(),
  NbCardModule,
  NbInputModule,
  NbListModule,
  FormsModule,
  NbCalendarRangeModule,
  NbCalendarModule,
  NbTooltipModule
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  InputSimpleComponent,
  InputMaskComponent,
  TextAreaSimpleComponent,
  ItemComponent,
  TimeLineComponent,
  CalendarioComponent
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  CpfPipe,
  DatePipe,
  TelefonePipe,
  CepPipe,
  EspecialidadePipe,
  MedicoPipe,
  LugarPipe,
  VisaoPipe,
];

const ENUMS = [
  EspecialidadeEnum,
  MedicoEnum,
  LugarEnum,
  VisaoEnum
];

@NgModule({
  imports: [
    CommonModule,
    ...NB_MODULES,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        FormatterService,
        ValidatorService,
        CalendarioService,
        ...ENUMS,
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
      ],
    };
  }
}
