import { Component } from '@angular/core';
import { NbCalendarRange, NbIconLibraries } from '@nebular/theme';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';

@Component({
  selector: 'ngx-calendario-recepcionista',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.scss']
})
export class CalendarioComponent {
  public data = [
    {
      data: '2019-09-06', maximoEncaixes: 5, agendamentos: [
        { hora: '08:00', status: 'Livre', marcacao: null },
        { hora: '08:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreiraddddddddddddddd', cpf: '' } },
        { hora: '09:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
        { hora: '09:30', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
        { hora: '10:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-07', maximoEncaixes: 5, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-08', maximoEncaixes: 5, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-09', maximoEncaixes: 5, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
        { hora: '11:00', status: 'Livre', marcacao: null },
        { hora: '11:30', status: 'Livre', marcacao: null },
        { hora: '12:00', status: 'Livre', marcacao: null },
      ]
    },
    {
      data: '2019-09-10', maximoEncaixes: 0, agendamentos: [
        { hora: '10:00', status: 'Livre', marcacao: null },
        { hora: '10:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
        { hora: '11:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
        { hora: '11:30', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
        { hora: '12:00', status: 'Ocupado', marcacao: { nome: 'Arthur Ferreira', cpf: '' } },
      ]
    },
  ];

  public date = new Date();
  public isOpen = true;
  public options = [
    { value: 'Dia', label: 'Dia' },
    { value: 'Semana', label: 'Semana' },
  ];
  public range: NbCalendarRange<Date>;
  public option = 'Semana';
  public medico = 'André Domarco';
  public lugares = 'Nova América';

  constructor(iconsLibrary: NbIconLibraries,
    public calendarioService: CalendarioService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
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
}
