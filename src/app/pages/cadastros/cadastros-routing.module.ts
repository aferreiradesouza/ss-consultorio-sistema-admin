import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProntuariosComponent } from './prontuarios/prontuarios.component';
import { ModelosDocumentosComponent } from './modelos-documentos/modelos-documentos.component';
import { CadastroDocumentosComponent } from './modelos-documentos/cadastro-documentos/cadastro-documentos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'prontuarios',
    pathMatch: 'full'
  },
  {
    path: 'prontuarios',
    component: ProntuariosComponent
  },
  {
    path: 'modelos-documentos',
    component: ModelosDocumentosComponent
  },
  {
    path: 'modelos-documentos/adicionar',
    component: CadastroDocumentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule {
}
