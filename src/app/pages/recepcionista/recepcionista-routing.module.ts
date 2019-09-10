import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioRecepcaoComponent } from './calendario/calendario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendario',
    pathMatch: 'full'
  },
  {
    path: 'calendario',
    component: CalendarioRecepcaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepcionistaRoutingModule {
}
