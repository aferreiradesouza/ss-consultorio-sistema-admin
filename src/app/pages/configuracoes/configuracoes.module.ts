import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesComponent } from './configuracoes.component';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    ConfiguracoesRoutingModule,
  ],
  declarations: [
    ConfiguracoesComponent,
  ],
})
export class ConfiguracoesModule { }
