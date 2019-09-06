import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPacientesComponent } from './listagem/listagem.component';
import { AdicionarPacientesComponent } from './adicionar/adicionar.component';
import { PerfilPacientesComponent } from './perfil/perfil.component';

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
  {
    path: 'perfil',
    component: PerfilPacientesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {
}
