import { Component, OnInit } from '@angular/core';
import { CalendarioMockService } from '../../../@core/mock/calendario';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';

@Component({
  selector: 'ngx-agenda-do-dia',
  templateUrl: './agenda-do-dia.component.html',
  providers: [CalendarioMockService],
  styles: [`
    nb-card-header > h5 {
      color: white;
    }
  `]
})
export class AgendaDoDiaComponent implements OnInit {

  public isLoading = false;
  public data: any;
  public dataEvent = moment().format('YYYY-MM-DD');

  constructor(
    public calendarioMock: CalendarioMockService,
    public calendarioService: CalendarioService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.calendarioMock.getDataWithLoading().then(response => {
      this.isLoading = false;
      this.data = response;
    });
  }

  formatarHeader() {
    return `${moment(this.dataEvent).date()} de
            ${this.calendarioService.formatarMes(moment(this.dataEvent).month()).extenso} de
            ${moment(this.dataEvent).year()},
            ${this.calendarioService.formatarDay(moment(this.dataEvent).day()).extenso}`;
  }
}
