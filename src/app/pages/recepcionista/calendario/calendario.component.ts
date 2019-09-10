import { Component, ViewChild } from '@angular/core';
import { NbCalendarRange, NbIconLibraries } from '@nebular/theme';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { CalendarioComponent } from '../../../shared/components';
import { CalendarioData } from '../../../@core/data/calendario';

@Component({
  selector: 'ngx-calendario-recepcionista',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.scss']
})
export class CalendarioRecepcaoComponent {

  public data: any[];
  public date = new Date();
  public dataAtual = new Date();
  public isOpen = true;
  public options = [
    { value: 'Dia', label: 'Dia' },
    { value: 'Semana', label: 'Semana' },
  ];
  public range: NbCalendarRange<Date>;
  public option = 'Semana';
  public medico = 'André Domarco';
  public lugares = 'Nova América';

  @ViewChild(CalendarioComponent, {static: false}) calendario: CalendarioComponent;

  constructor(iconsLibrary: NbIconLibraries,
    public calendarioService: CalendarioService,
    public calendarioMock: CalendarioData) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    this.data = this.calendarioMock.getData();
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

  disabledButton() {
  }
}
