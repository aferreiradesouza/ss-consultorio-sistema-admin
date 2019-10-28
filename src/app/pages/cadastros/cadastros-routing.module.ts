import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProntuariosComponent } from './prontuarios/prontuarios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prontuarios',
    pathMatch: 'full'
  },
  {
    path: 'prontuarios',
    component: ProntuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule {
}
