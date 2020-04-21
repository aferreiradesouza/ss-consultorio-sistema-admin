import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbAlertModule, NbSpinnerModule, NbSelectModule, NbIconModule } from '@nebular/theme';

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
    FormsModule,
    NbIconModule
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
