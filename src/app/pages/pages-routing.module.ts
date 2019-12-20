import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './erro/not-found/not-found.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { PermissaoGuard } from '../shared/guard/permissao.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module')
        .then(m => m.HomeModule),
      canActivate: [AuthGuard, PermissaoGuard]
    },
    {
      path: 'erro',
      loadChildren: () => import('./erro/erro.module')
        .then(m => m.ErroModule),
    },
    {
      path: 'configuracoes',
      loadChildren: () => import('./configuracoes/configuracoes.module')
        .then(m => m.ConfiguracoesModule),
      canActivate: [AuthGuard, PermissaoGuard]
    },
    {
      path: 'cadastros',
      loadChildren: () => import('./cadastros/cadastros.module')
        .then(m => m.CadastrosModule),
      canActivate: [AuthGuard, PermissaoGuard]
    },
    {
      path: 'pacientes',
      loadChildren: () => import('./pacientes/pacientes.module')
        .then(m => m.PacientesModule),
      canActivate: [AuthGuard, PermissaoGuard]
    },
    {
      path: 'recepcionista',
      loadChildren: () => import('./recepcionista/recepcionista.module')
        .then(m => m.RecepcionistaModule),
      canActivate: [AuthGuard, PermissaoGuard]
    },
    {
      path: 'medico',
      loadChildren: () => import('./medico/medico.module')
        .then(m => m.MedicoModule),
      canActivate: [AuthGuard, PermissaoGuard]
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
