import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbAlertModule, NbSpinnerModule, NbSelectModule } from '@nebular/theme';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HomeService } from './home.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    NbCardModule,
    NbButtonModule,
    HomeRoutingModule,
    NbAlertModule,
    NgApexchartsModule,
    NbSpinnerModule,
    NbSelectModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
