import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErroComponent } from './erro.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ErroComponent,
    children: [
      {
        path: '404',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErroRoutingModule {
}
