import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { ErroRoutingModule } from './erro-routing.module';
import { ErroComponent } from './erro.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    ErroRoutingModule,
  ],
  declarations: [
    ErroComponent,
    NotFoundComponent,
  ],
})
export class ErroModule { }
