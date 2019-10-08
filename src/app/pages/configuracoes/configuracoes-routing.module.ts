import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AgendaComponent } from './agenda/agenda.component';
import { UnidadesDeAtendimentoComponent } from './unidades-de-atendimento/unidades-de-atendimento.component';

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
    path: 'agenda',
    component: AgendaComponent
  },
  {
    path: 'unidades-de-atendimento',
    component: UnidadesDeAtendimentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracoesRoutingModule {
}
