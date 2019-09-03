import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPacientesComponent } from './listagem/listagem.component';
import { AdicionarPacientesComponent } from './adicionar/adicionar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listagem',
    pathMatch: 'full'
  },
  {
    path: 'listagem',
    component: ListagemPacientesComponent
  },
  {
    path: 'adicionar',
    component: AdicionarPacientesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {
}
