import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaDoDiaComponent } from './agenda-do-dia/agenda-do-dia.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'agenda-do-dia',
    pathMatch: 'full'
  },
  {
    path: 'agenda-do-dia',
    component: AgendaDoDiaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoRoutingModule {
}
