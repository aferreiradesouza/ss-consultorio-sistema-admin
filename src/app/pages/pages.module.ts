import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { HomeModule } from './home/home.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule,
    NbMenuModule,
    MiscellaneousModule,
    HomeModule,
    ConfiguracoesModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
