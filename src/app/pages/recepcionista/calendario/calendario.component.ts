import { Component, ViewChild, OnInit } from '@angular/core';
import { NbCalendarRange, NbIconLibraries } from '@nebular/theme';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { CalendarioComponent } from '../../../shared/components';
import { CalendarioData } from '../../../@core/data/calendario';
import { CalendarioDoDiaComponent } from '../../../shared/components/calendario-do-dia/calendario-do-dia.component';

@Component({
  selector: 'ngx-calendario-recepcionista',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.scss']
})
export class CalendarioRecepcaoComponent implements OnInit {

  public data: any[];
  public date = new Date();
  public isOpen = true;
  public range: NbCalendarRange<Date>;
  public isLoading = false;
  public visao = '2';
  public medico = '1';
  public lugar = '1';
  public especialidade = '1';
  public dataEvent: any;

  @ViewChild(CalendarioComponent, {static: false}) calendario: CalendarioComponent;
  @ViewChild(CalendarioDoDiaComponent, {static: false}) calendarioDoDia: CalendarioDoDiaComponent;

  constructor(iconsLibrary: NbIconLibraries,
    public calendarioService: CalendarioService,
    public calendarioMock: CalendarioData) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.calendarioMock.getDataWithLoading().then(response => {
      this.isLoading = false;
      this.data = response;
    });
  }

  handleRangeChange(event) {
    if (!event.end) {
      this.range = {
        start: moment(event.start)
          .subtract(this.calendarioService.getSubtractDay(moment(event.start).day()), 'd').toDate(),
        end: moment(event.start).add(this.calendarioService.getAddDay(moment(event.start).day()), 'd').toDate()
      };
    }
  }

  dataatual() {
    this.date = new Date();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  getIconHeader() {
    return this.isOpen ? 'close-outline' : 'menu-2-outline';
  }

  changeMesPainel(type: string) {
    this.calendario.changeMes(type);
  }

  dataSelecionada(evento) {
    this.visao = '1';
    this.dataEvent = evento;
    console.log(evento);
  }

  changeDiaPainel(type: string) {
    this.calendarioDoDia.changeDia(type);
  }
}
