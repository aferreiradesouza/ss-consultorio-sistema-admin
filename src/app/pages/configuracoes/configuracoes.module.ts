import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbSelectModule, NbCheckboxModule, NbSpinnerModule, NbUserModule, NbToastrModule, NbTabsetModule, NbListModule, NbIconModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgendaComponent } from './agenda/agenda.component';
import { UnidadesDeAtendimentoComponent } from './unidades-de-atendimento/unidades-de-atendimento.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdicionarUsuarioComponent } from './usuarios/adicionar/adicionar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar/editar-usuario.component';
import { PerfilUsuarioComponent } from './usuarios/perfil/perfil-usuario.component';
import { AdicionarUnidadeAtendimentoComponent } from './unidades-de-atendimento/adicionar/adicionar-unidade-atendimento.component';
import { EditarUnidadeAtendimentoComponent } from './unidades-de-atendimento/editar/editar-unidade-atendimento.component';
import { PerfilUnidadeAtendimentoComponent } from './unidades-de-atendimento/perfil/perfil-unidade-atendimento.component';
import { UserCellComponent } from './components-table/userCell.component';
import { DeletarUsuarioComponent } from './usuarios/deletar/deletar.component';
import { UnidadesCellComponent } from './components-table/unidadesCell.component';
import { DeletarUnidadeAtendimentoComponent } from './unidades-de-atendimento/deletar/deletar.component';
import { PerfilAgendaCalendarioComponent } from './agenda/calendario/perfil/perfil.component';
import { EditarAgendaCalendarioComponent } from './agenda/calendario/editar/editar.component';
import { DeletarAgendaCalendarioComponent } from './agenda/calendario/deletar/deletar.component';
import { AdicionarAgendaCalendarioComponent } from './agenda/calendario/adicionar/adicionar.component';
import { AdicionarBloqueioComponent } from './agenda/bloqueio/adicionar/adicionar.component';
import { PerfilBloqueioComponent } from './agenda/bloqueio/perfil/perfil.component';
import { EditarBloqueioComponent } from './agenda/bloqueio/editar/editar.component';
import { DeletarBloqueioComponent } from './agenda/bloqueio/deletar/deletar.component';
import { CellAgendaTableComponent } from './components-table/cell-agenda-table.component';
import { PerfilCellComponent } from './components-table/perfilCell.component';
import { CellStatusTableComponent } from './components-table/cell-status-table.component';

const PAGES = [
  UsuariosComponent,
  AgendaComponent,
  UnidadesDeAtendimentoComponent
];

const CELL_TABLE = [
  UserCellComponent,
  UnidadesCellComponent,
  CellAgendaTableComponent,
  CellStatusTableComponent,
  PerfilCellComponent
];

const MODAIS = [
  AdicionarUsuarioComponent,
  EditarUsuarioComponent,
  PerfilUsuarioComponent,
  AdicionarUnidadeAtendimentoComponent,
  EditarUnidadeAtendimentoComponent,
  PerfilUnidadeAtendimentoComponent,
  DeletarUsuarioComponent,
  DeletarUnidadeAtendimentoComponent,
  AdicionarAgendaCalendarioComponent,
  DeletarAgendaCalendarioComponent,
  EditarAgendaCalendarioComponent,
  PerfilAgendaCalendarioComponent,
  PerfilBloqueioComponent,
  AdicionarBloqueioComponent,
  EditarBloqueioComponent,
  DeletarBloqueioComponent,
];

const NB_MODULES = [
  NbCardModule,
  NbButtonModule,
  Ng2SmartTableModule,
  NbDialogModule.forRoot(),
  NbSelectModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbUserModule,
  NbCheckboxModule,
  NbToastrModule,
  NbTabsetModule,
  NbListModule,
  NbIconModule,
  NbDatepickerModule,
  NbInputModule
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
    ...CELL_TABLE,
    ...PAGES,
    ...MODAIS
  ],
  entryComponents: [
    ...CELL_TABLE,
    ...MODAIS
  ]
})
export class ConfiguracoesModule { }
