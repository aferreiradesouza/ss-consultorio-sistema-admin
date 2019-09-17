import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfissionaisDeSaudeComponent } from './profissionais-de-saude/profissionais-de-saude.component';
import { UnidadesDeAtendimentoComponent } from './unidades-de-atendimento/unidades-de-atendimento.component';
import { BackupComponent } from './backup/backup.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

const PAGES = [
  UsuariosComponent,
  ProfissionaisDeSaudeComponent,
  UnidadesDeAtendimentoComponent,
  BackupComponent,
];

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule
];

@NgModule({
  imports: [
    SharedModule,
    ConfiguracoesRoutingModule,
    FormsModule,
    ...NB_MODULES
  ],
  declarations: [
    ...PAGES
  ],
})
export class ConfiguracoesModule { }
