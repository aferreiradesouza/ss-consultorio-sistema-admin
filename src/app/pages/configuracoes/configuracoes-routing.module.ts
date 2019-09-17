import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfissionaisDeSaudeComponent } from './profissionais-de-saude/profissionais-de-saude.component';
import { UnidadesDeAtendimentoComponent } from './unidades-de-atendimento/unidades-de-atendimento.component';
import { BackupComponent } from './backup/backup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'profissionais-de-saude',
    component: ProfissionaisDeSaudeComponent
  },
  {
    path: 'unidades-de-atendimento',
    component: UnidadesDeAtendimentoComponent
  },
  {
    path: 'backup',
    component: BackupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracoesRoutingModule {
}
