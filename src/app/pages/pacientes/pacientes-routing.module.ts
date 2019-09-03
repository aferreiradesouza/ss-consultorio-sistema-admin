import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemPacientesComponent } from './listagem/listagem.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listagem',
    pathMatch: 'full'
  },
  {
    path: 'listagem',
    component: ListagemPacientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {
}
