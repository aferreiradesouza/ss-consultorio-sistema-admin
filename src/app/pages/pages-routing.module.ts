import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

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
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'configuracoes',
      loadChildren: () => import('./configuracoes/configuracoes.module')
        .then(m => m.ConfiguracoesModule),
    },
    {
      path: 'pacientes',
      loadChildren: () => import('./pacientes/pacientes.module')
        .then(m => m.PacientesModule),
    },
    {
      path: 'recepcionista',
      loadChildren: () => import('./recepcionista/recepcionista.module')
        .then(m => m.RecepcionistaModule),
    },
    {
      path: 'medico',
      loadChildren: () => import('./medico/medico.module')
        .then(m => m.MedicoModule),
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
