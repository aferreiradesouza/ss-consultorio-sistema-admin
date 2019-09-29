import { Component, ViewChild, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { NbCalendarRange, NbIconLibraries, NbDialogService, NbDatepickerComponent, NbDatepicker, NbToastrService, NbCalendarComponent, NbDateService } from '@nebular/theme';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { CalendarioComponent } from '../../../shared/components';
import { CalendarioData } from '../../../@core/data/calendario';
import { CalendarioDoDiaComponent } from '../../../shared/components/calendario-do-dia/calendario-do-dia.component';
import { LegendasComponent } from '../legendas/legendas.component';
import { AgendarConsultaComponent } from '../agendar-consulta/agendar-consulta.component';
import { AlterarStatusComponent } from '../alterar-status/alterar-status.component';
import { DetalhesConsultaComponent } from '../detalhes-consulta/detalhes-consulta.component';
import { CalendarCustomDayCellComponent } from './day-cell.component';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { BloqueioComponent } from '../bloqueio/bloqueio.component';
import { Usuario, ListagemUsuario, ListagemConsultorios } from '../../../shared/interface';
import { AgendaHubService } from '../../../shared/services/agenda-hub.service';

@Component({
  selector: 'ngx-calendario-recepcionista',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  entryComponents: [CalendarCustomDayCellComponent]
})
export class CalendarioRecepcaoComponent implements OnInit {

  public data: any[];
  public date = new Date();
  public isOpen = true;
  public range: NbCalendarRange<Date>;
  public isLoading = false;
  public dataEvent: any = null;
  public dayCellComponent = CalendarCustomDayCellComponent;
  public group: any[];
  public dataCalendarioDia: any;
  public listaMedicos: ListagemUsuario[] | string;
  public listaConsultorios: ListagemConsultorios[] | string;

  public visao = '2';
  public medico = null;
  public lugar = null;
  public especialidade = '1';
  public diaDe = '';
  public diaAte = '';
  public filter = (date) => false;

  @ViewChild(CalendarioComponent, { static: false }) calendario: CalendarioComponent;
  @ViewChild(CalendarioDoDiaComponent, { static: false }) calendarioDoDia: CalendarioDoDiaComponent;
  @ViewChild('ngmodelAte', { static: false }) datePicker: NbDatepickerComponent<any>;

  constructor(iconsLibrary: NbIconLibraries,
    private agendaHubService: AgendaHubService,
    private _ngZone: NgZone,
    public calendarioService: CalendarioService,
    public calendarioMock: CalendarioData,
    private dialogService: NbDialogService,
    private recepcionistaService: RecepcionistaService,
    private toastrService: NbToastrService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    this.subscribeSignalREventos();
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.recepcionistaService.obterMedicos().then(response => {
      if (response.sucesso) {
        this.listaMedicos = response.resultado;
      } else {
        this.toastrService.show('', response.resultado,
          { status: 'danger', duration: 3000, position: <any>'bottom-right' });
      }
    }).catch(err => {
      this.toastrService.show('', 'Sistema Indisponível no momento, tente novamente mais tarde.',
        { status: 'danger', duration: 3000, position: <any>'bottom-right' });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  private subscribeSignalREventos(): void {
    this.agendaHubService.novaConsulta.subscribe((data: any) => {
      this._ngZone.run(() => {
        console.log('calendario novaConsulta', data)
      });
    });
    this.agendaHubService.novoBloqueio.subscribe((data: any) => {
      this._ngZone.run(() => {
        console.log('calendario novoBloqueio', data)
      });
    });
    this.agendaHubService.mudancaBloqueio.subscribe((data: any) => {
      this._ngZone.run(() => {
        console.log('calendario mudancaBloqueio', data)
      });
    });
    this.agendaHubService.mudancaStatusConsulta.subscribe((data: any) => {
      this._ngZone.run(() => {
        console.log('calendario mudancaStatusConsulta', data)
      });
    });
  }

  async obterConsultorios(value: number) {
    this.isLoading = true;
    this.lugar = null;
    this.listaConsultorios = null;
    await this.recepcionistaService.obterConsultorios(value).then(response => {
      if (response.sucesso) {
        if (!response.resultado.length) {
          this.toastrService.show('', 'O Médico não tem nenhum consultório, escolha outro médico.',
            { status: 'danger', duration: 3000, position: <any>'bottom-right' });
          return;
        }
        this.listaConsultorios = response.resultado;
      } else {
        this.toastrService.show('', response.resultado,
          { status: 'danger', duration: 3000, position: <any>'bottom-right' });
      }
    }).catch(err => {
      this.toastrService.show('', 'Sistema Indisponível no momento, tente novamente mais tarde.',
        { status: 'danger', duration: 3000, position: <any>'bottom-right' });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  changeDia(event) {
    this.dataEvent = moment(event).format('YYYY-MM-DD');
    this.obterGrupoClick();
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
  }

  async filtrar() {
    this.isLoading = true;
    const data = {
      idMedico: this.medico,
      idConsultorio: this.lugar,
      dataInicial: moment(this.diaDe).format('YYYY-MM-DD'),
      dataFinal: moment(this.diaAte).format('YYYY-MM-DD'),
    };
    await this.recepcionistaService.obterConsultas(data).then(response => {
      if (response.sucesso) {
        this.data = response.objeto;
        this.filter = (date) => {
          return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(date).format('YYYY-MM-DD')) > -1;
        };
        this.proximoDiaUtil();
        this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
        this.obterGrupoHoje();
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: 3000, position: <any>'bottom-right' });
      }
    }).catch(err => {
      this.toastrService.show('', 'Sistema indisponível no momento, tente novamente mais tarde.',
        { status: 'danger', duration: 3000, position: <any>'bottom-right' });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  proximoDiaUtil() {
    this.data = this.data.sort((a: any, b: any): any => {
      return <any>moment(a.data).toDate() - <any>moment(b.data).toDate();
    });
    if (
      moment()
        .isBefore(moment(this.data[this.data.length - 1].data))
      && !moment()
        .isAfter(moment(this.data[0].data))) {
      this.dataEvent = moment.min(this.data.map(e => moment(e.data))).toDate();
    } else if (
      moment()
        .isBefore(moment(this.data[this.data.length - 1].data))
      && moment()
        .isAfter(moment(this.data[0].data))) {
      const event = this.data.filter(e => moment(e.data).diff(moment(), 'days') >= 0)[0];
      this.dataEvent = moment(event.data).toDate();
    } else {
      this.dataEvent = moment.max(this.data.map(e => moment(e.data))).toDate();
    }
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
    if (type === 'proximo') {
      const index = this.obterIndex(this.group[4].data);
      // const totalIndex = this.data.length - 1;
      // let min = 1;
      // const max = 5;
      // this.group = this.data.filter((e, ind) => {
      //   if ((index < ind) && index + 5 <= totalIndex) {
      //     const iformatado = min++;
      //     return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind + (min === 1 ? min : 0));
      //   } else {
      //     return false;
      //   }
      // });
      console.log(this.group);
    } else {
      const index = this.obterIndex(this.group[0].data);
      if (index === 0) {
        return;
      }
      const min = 1;
      let max = 5;
      this.group = this.data.filter((e, ind) => {
        console.log(index - 4 <= 0);
        if (index - 4 <= 0) {
          const iformatado = max--;
          console.log(iformatado);
          return (this.data[index + iformatado] && iformatado >= min);
        } else {
          return false;
        }
      });
      console.log(this.group);
    }
    // this.calendario.changeMes(type);
  }

  obterGrupoHoje() {
    const index = this.obterIndex(this.dataEvent);
    console.log(index);
    let min = 0;
    const max = 4;
    this.group = this.data.filter((e, ind) => {
      if (index <= ind) {
        const iformatado = min++;
        return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind);
      } else {
        return false;
      }
    });
    console.log(this.group);
    if (this.group.length < 5) {
      const sobra = (this.data.length >= 5 ? 5 : this.data.length) - this.group.length;
      for (let i = 1; i <= sobra; i++) {
        console.log(this.obterIndex(this.group[0].data) - 1);
        const indexSobra = this.obterIndex(this.group[0].data) - 1;
        this.group.unshift(this.data[indexSobra]);
      }
    }
  }

  obterIndex(data): number {
    return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(data).format('YYYY-MM-DD'));
  }

  obterGrupoClick() {
    const index = this.obterIndex(this.dataEvent);
    let min = -2;
    let max = 2;
    if (index - 2 < 0) {
      min = 0;
      max = 4;
      if (index - 1 === 0) {
        min = -1;
        max = 3;
      }
    }
    this.group = this.obterGrupo(min, max, index);
    if (this.group.length < 5) {
      const sobra = (this.data.length >= 5 ? 5 : this.data.length) - this.group.length;
      for (let i = 1; i <= sobra; i++) {
        const indexSobra = this.obterIndex(this.group[0].data) - 1;
        this.group.unshift(this.data[indexSobra]);
      }

    }
    console.log(this.group);
  }

  setMinAndMaxValueAte(event) {
    this.datePicker.min = moment(event).add(1, 'month').toDate();
    this.datePicker.max = moment(event).add(1, 'year').toDate();
  }

  obterGrupo(min: number, max: number, index: number): any[] {
    return this.data.filter((e, ind) => {
      if (index - 2 <= ind) {
        const iformatado = min++;
        return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind);
      } else {
        return false;
      }
    });
  }

  dataSelecionada(evento) {
    this.visao = '1';
    this.dataEvent = moment(evento.diaCompleta).toDate();
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
    console.log(this.dataCalendarioDia);
  }

  changeDiaPainel(type: string) {
    this.calendarioDoDia.changeDia(type);
  }

  async mostrarLegendas() {
    this.dialogService.open(
      LegendasComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  agendar(data) {
    this.dialogService.open(
      AgendarConsultaComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  alterarStatus(data) {
    this.dialogService.open(
      AlterarStatusComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  infoConsulta(data) {
    this.dialogService.open(
      DetalhesConsultaComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  bloqueio(data) {
    this.dialogService.open(
      BloqueioComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }
}
