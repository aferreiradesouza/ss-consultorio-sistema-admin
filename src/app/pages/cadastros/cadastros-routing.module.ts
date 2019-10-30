import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnamneseComponent } from './anamnese/anamnese.component';
import { ModelosDocumentosComponent } from './modelos-documentos/modelos-documentos.component';
import { CadastroDocumentosComponent } from './modelos-documentos/cadastro-documentos/cadastro-documentos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'anamnese',
    pathMatch: 'full'
  },
  {
    path: 'anamnese',
    component: AnamneseComponent
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
