import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaDoDiaComponent } from './agenda-do-dia/agenda-do-dia.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agenda-do-dia',
    pathMatch: 'full'
  },
  {
    path: 'agenda-do-dia',
    component: AgendaDoDiaComponent
  },
  {
    path: 'atendimento/:idConsulta',
    component: AtendimentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoRoutingModule {
}
