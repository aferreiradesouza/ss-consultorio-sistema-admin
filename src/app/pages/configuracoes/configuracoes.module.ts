import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbSelectModule, NbCheckboxModule, NbSpinnerModule, NbUserModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfissionaisDeSaudeComponent } from './profissionais-de-saude/profissionais-de-saude.component';
import { UnidadesDeAtendimentoComponent } from './unidades-de-atendimento/unidades-de-atendimento.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarProfissionalComponent } from './profissionais-de-saude/editar/editar-profissional.component';
import { AdicionarProfissionalComponent } from './profissionais-de-saude/adicionar/adicionar-profissional.component';
import { PerfilProfissionalComponent } from './profissionais-de-saude/perfil/perfil-profissional.component';
import { AdicionarUsuarioComponent } from './usuarios/adicionar/adicionar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar/editar-usuario.component';
import { PerfilUsuarioComponent } from './usuarios/perfil/perfil-usuario.component';
import { AdicionarUnidadeAtendimentoComponent } from './unidades-de-atendimento/adicionar/adicionar-unidade-atendimento.component';
import { EditarUnidadeAtendimentoComponent } from './unidades-de-atendimento/editar/editar-unidade-atendimento.component';
import { PerfilUnidadeAtendimentoComponent } from './unidades-de-atendimento/perfil/perfil-unidade-atendimento.component';
import { UserCellComponent } from './usuarios/userCell.component';

const PAGES = [
  UsuariosComponent,
  ProfissionaisDeSaudeComponent,
  UnidadesDeAtendimentoComponent
];

const MODAIS = [
  AdicionarProfissionalComponent,
  EditarProfissionalComponent,
  PerfilProfissionalComponent,
  AdicionarUsuarioComponent,
  EditarUsuarioComponent,
  PerfilUsuarioComponent,
  AdicionarUnidadeAtendimentoComponent,
  EditarUnidadeAtendimentoComponent,
  PerfilUnidadeAtendimentoComponent
];

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule,
  NbDialogModule.forRoot(),
  NbSelectModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbUserModule
];

@NgModule({
  imports: [
    SharedModule,
    ConfiguracoesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...NB_MODULES
  ],
  declarations: [
    UserCellComponent,
    ...PAGES,
    ...MODAIS
  ],
  entryComponents: [
    ...MODAIS
  ]
})
export class ConfiguracoesModule { }
