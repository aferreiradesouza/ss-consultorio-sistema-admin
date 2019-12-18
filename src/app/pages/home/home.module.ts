import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbAlertModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    HomeRoutingModule,
    NbAlertModule
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
