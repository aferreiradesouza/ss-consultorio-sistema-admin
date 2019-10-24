import { Component, ViewChild, OnInit, AfterViewInit, NgZone, OnChanges } from '@angular/core';
import { NbCalendarRange, NbIconLibraries, NbDialogService, NbDatepickerComponent, NbDatepicker, NbToastrService, NbCalendarComponent, NbDateService, NbCalendarViewMode, NbCalendarCell, NbCalendarDayCellComponent } from '@nebular/theme';
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
import { Usuario, ListagemUsuario, ListagemConsultoriosUsuario, Consulta, StatusConsulta, TiposAtendimento } from '../../../shared/interface';
import { AgendaHubService } from '../../../shared/services/agenda-hub.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { TOASTR } from '../../../shared/constants/toastr';

interface FiltroCalendario {
  idMedico: number;
  idConsultorio: number;
  dataInicial: string;
  dataFinal: string;
}

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
  public listaMedicos: ListagemUsuario[];
  public listaConsultorios: ListagemConsultoriosUsuario[];
  public statusConsultas: StatusConsulta[];
  public tiposAtendimentos: TiposAtendimento[];

  public visao = '2';
  public medico = null;
  public lugar = null;
  public medicoEscolhido = null;
  public lugarEscolhido = null;
  public especialidade = '1';
  public diaDe = '';
  public diaAte = '';
  public diaDeEscolhido = '';
  public diaAteEscolhido = '';
  public firstSearch = true;
  public filter = (date) => false;

  @ViewChild(CalendarioComponent, { static: false }) calendario: CalendarioComponent;
  @ViewChild(CalendarioDoDiaComponent, { static: false }) calendarioDoDia: CalendarioDoDiaComponent;
  @ViewChild(NbCalendarComponent, { static: false }) NbCalendar: NbCalendarComponent<any>;
  @ViewChild('ngmodelAte', { static: false }) datePicker: NbDatepickerComponent<any>;

  constructor(iconsLibrary: NbIconLibraries,
    private agendaHubService: AgendaHubService,
    private _ngZone: NgZone,
    public calendarioService: CalendarioService,
    public calendarioMock: CalendarioData,
    private dialogService: NbDialogService,
    private recepcionistaService: RecepcionistaService,
    private toastrService: NbToastrService,
    public localStorageService: LocalStorageService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    this.subscribeSignalREventos();
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.obterDadosIniciais();
    if (this.localStorageService.has('filtro-calendario')) {
      const filtro = <FiltroCalendario>this.localStorageService.getJson('filtro-calendario');
      this.medico = filtro.idMedico;
      await this.obterConsultorios(this.medico);
      this.lugar = filtro.idConsultorio;
      this.diaDe = <any>moment(filtro.dataInicial).toDate();
      this.setMinAndMaxValueAte(this.diaDe);
      this.diaAte = <any>moment(filtro.dataFinal).toDate();
      await this.filtrar();
      this.isLoading = false;
      return;
    }
    const medicoId = this.listaMedicos[0].id;
    await this.obterConsultorios(medicoId);
    this.medico = medicoId;
    this.lugar = this.listaConsultorios[0].idConsultorio;
    this.diaDe = <any>moment().subtract(2, 'months').toDate();
    this.setMinAndMaxValueAte(this.diaDe);
    this.diaAte = <any>moment().add(4, 'months').toDate();

    await this.filtrar();
    this.isLoading = false;
  }

  async obterDadosIniciais(): Promise<void> {
    await Promise.all([this.obterMedicos(), this.obterStatusConsulta(), this.obterTiposAtendimento()]);
  }

  selecionarDiaNoCalendario(data = this.dataEvent) {
    this.dataEvent = moment(data).toDate();
    this.NbCalendar.visibleDate = moment(data).toDate();
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
  }

  selectDiaEscolhido(event) {
    if (event === '2') {
      this.obterGrupoClick();
    }
  }

  get nomeMedico() {
    return this.listaMedicos.filter(e => e.id === this.medicoEscolhido)[0].nome;
  }

  get nomeConsultorio() {
    return this.listaConsultorios.filter(e => e.idConsultorio === this.lugarEscolhido)[0].nome;
  }

  async obterStatusConsulta() {
    await this.recepcionistaService.obterStatusConsulta().then(response => {
      if (response.sucesso) {
        this.statusConsultas = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    });
  }

  async obterTiposAtendimento() {
    await this.recepcionistaService.obterTiposAtendimento().then(response => {
      if (response.sucesso) {
        this.tiposAtendimentos = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    });
  }

  async obterMedicos() {
    await this.recepcionistaService.obterMedicos().then(response => {
      if (response.sucesso) {
        this.listaMedicos = response.resultado;
      } else {
        this.toastrService.show('', response.error,
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position, });
      }
    });
  }

  private subscribeSignalREventos(): void {
    const userCpf = this.localStorageService.getJson('login').cpf;
    this.agendaHubService.novaConsulta.subscribe((data: any) => {
      this._ngZone.run(async () => {
        if (data.cpfCriador.Cpf === userCpf) { return; }
        const dataValida = moment(data.Data).isBetween(moment(this.diaDeEscolhido), moment(this.diaAteEscolhido));
        const ehMesmoConsultorio = this.lugarEscolhido === data.IdConsultorio;
        const ehMesmoMedico = this.medicoEscolhido === data.IdUsuario;
        this.toastrService.show(`Dia: ${moment(data.Data).format('DD/MM/YYYY')} - Hora: ${data.Hora}`, `Tem uma nova consulta marcada!`,
          { status: 'info', duration: 0, position: TOASTR.position });
        if (dataValida && ehMesmoConsultorio && ehMesmoMedico) {
          await this.atualizarCalendario();
          this.obterGrupoClick();
          this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
        }
      });
    });
    this.agendaHubService.novoBloqueio.subscribe((data: any) => {
      this._ngZone.run(async () => {
        if (data.cpfCriador.Cpf === userCpf) { return; }
        const dataInicioValida = moment(data.DataInicio).isBetween(moment(this.diaDeEscolhido), moment(this.diaAteEscolhido));
        const dataFimValida = moment(data.DataFim).isBetween(moment(this.diaDeEscolhido), moment(this.diaAteEscolhido));
        const ehMesmoConsultorio = this.lugarEscolhido === data.IdConsultorio;
        const ehMesmoMedico = this.medicoEscolhido === data.IdMedico;
        this.toastrService.show(`
        ${moment(data.DataInicio).format('DD/MM/YYYY')} às ${moment(data.DataInicio).format('HH:mm')}
        até ${moment(data.DataFim).format('DD/MM/YYYY')} às ${moment(data.DataFim).format('HH:mm')}.`,
        `Temos um novo bloqueio nos dias!`,
          { status: 'info', duration: 0, position: <any>'bottom-right' });
        if (dataInicioValida && dataFimValida && ehMesmoConsultorio && ehMesmoMedico) {
          await this.atualizarCalendario();
          this.obterGrupoClick();
          this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
        }
      });
    });
    this.agendaHubService.mudancaBloqueio.subscribe((data: any) => {
      this._ngZone.run(async() => {
        if (data.cpfCriador.Cpf === userCpf) { return; }
        const dataInicioValida = moment(data.DataInicio).isBetween(moment(this.diaDeEscolhido), moment(this.diaAteEscolhido));
        const dataFimValida = moment(data.DataFim).isBetween(moment(this.diaDeEscolhido), moment(this.diaAteEscolhido));
        const ehMesmoConsultorio = this.lugarEscolhido === data.IdConsultorio;
        const ehMesmoMedico = this.medicoEscolhido === data.IdMedico;
        this.toastrService.show(`
        ${moment(data.DataInicio).format('DD/MM/YYYY')} às ${moment(data.DataInicio).format('HH:mm')}
        até ${moment(data.DataFim).format('DD/MM/YYYY')} às ${moment(data.DataFim).format('HH:mm')}.`,
        `Temos uma alteração no bloqueio!`,
          { status: 'info', duration: 0, position: <any>'bottom-right' });
        if (dataInicioValida && dataFimValida && ehMesmoConsultorio && ehMesmoMedico) {
          await this.atualizarCalendario();
          this.obterGrupoClick();
          this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
        }
      });
    });
    this.agendaHubService.mudancaStatusConsulta.subscribe((data: any) => {
      this._ngZone.run(async () => {
        if (data.cpfCriador.Cpf === userCpf) { return; }
        const dataValida = moment(data.Data).isBetween(moment(this.diaDeEscolhido), moment(this.diaAteEscolhido));
        const ehMesmoConsultorio = this.lugarEscolhido === data.IdConsultorio;
        const ehMesmoMedico = this.medicoEscolhido === data.IdUsuario;
        this.toastrService.show(`Dia: ${moment(data.Data).format('DD/MM/YYYY')} - Hora: ${data.Hora}`, `Temos uma mudança de status.`,
          { status: 'info', duration: 0, position: <any>'bottom-right' });
        if (dataValida && ehMesmoMedico && ehMesmoConsultorio) {
          await this.atualizarCalendario();
          this.obterGrupoClick();
          this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
        }
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
            { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
          return;
        }
        this.listaConsultorios = response.resultado;
      } else {
        this.toastrService.show('', response.error,
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
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
        this.medicoEscolhido = this.medico;
        this.lugarEscolhido = this.lugar;
        this.diaDeEscolhido = this.diaDe;
        this.diaAteEscolhido = this.diaAte;
        this.data = response.objeto;
        this.filter = (date) => {
          return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(date).format('YYYY-MM-DD')) > -1;
        };
        this.proximoDiaUtil();
        this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
        // this.obterGrupoHoje();
        this.obterGrupoClick();
        this.localStorageService.setJson('filtro-calendario', data);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoading = false;
      this.firstSearch = false;
    });
  }

  proximoDiaUtil(type?: 'button') {
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
    this.selecionarDiaNoCalendario(this.dataEvent);
    if (type === 'button') {
      this.obterGrupoClick();
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

  changeMesPainel(type: 'proximo' | 'anterior') {
    if (type === 'proximo') {
      const index = this.obterIndex(this.group[4].data);
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
      if (this.group.length < 5) {
        const sobra = (this.data.length >= 5 ? 5 : this.data.length) - this.group.length;
        for (let i = 1; i <= sobra; i++) {
          const indexSobra = this.obterIndex(this.group[0].data) - 1;
          this.group.unshift(this.data[indexSobra]);
        }
      }
    } else {
      let index = this.obterIndex(this.group[0].data) - 4;
      for (let i = 4; i >= 0; i--) {
        if (index < 0) {
          index = this.obterIndex(this.group[0].data) - i;
        } else if (index > 0) {
          break;
        }
      }
      if (index < 0) {
        return;
      }
      let min = 0;
      const max = 4;
      this.group = this.data.filter((e, ind) => {
        if (index <= ind) {
          const iformatado = min++;
          return (this.data[index - iformatado] && iformatado <= max) && (index + iformatado === ind);
        } else {
          return false;
        }
      });
      if (this.group.length < 5) {
        const sobra = (this.data.length >= 5 ? 5 : this.data.length) - this.group.length;
        for (let i = 1; i <= sobra; i++) {
          const indexSobra = this.obterIndex(this.group[0].data) + i;
          this.group.push(this.data[indexSobra]);
        }
      }
    }
    this.selecionarDiaNoCalendario(this.group[2].data);
  }

  obterGrupoHoje() {
    const index = this.obterIndex(this.dataEvent);
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
    if (this.group.length < 5) {
      const sobra = (this.data.length >= 5 ? 5 : this.data.length) - this.group.length;
      for (let i = 1; i <= sobra; i++) {
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
    this.selecionarDiaNoCalendario(evento.diaCompleta);
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
  }

  changeDiaPainel(type: 'proximo' | 'anterior') {
    let index = this.obterIndex(this.dataCalendarioDia.data);
    if (type === 'proximo') {
      if (index + 1 > this.data.length - 1) {
        return;
      }
      index += 1;
    } else {
      if (index - 1 < 0) {
        return;
      }
      index -= 1;
    }
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.data[index].data).format('YYYY-MM-DD'))[0];
    this.dataEvent = moment(this.dataCalendarioDia.data).toDate();
    this.selecionarDiaNoCalendario(this.dataCalendarioDia.data);
  }

  async atualizarCalendario() {
    this.isLoading = true;
    const data = {
      idMedico: this.medico,
      idConsultorio: this.lugar,
      dataInicial: moment(this.diaDe).format('YYYY-MM-DD'),
      dataFinal: moment(this.diaAte).format('YYYY-MM-DD'),
    };
    await this.recepcionistaService.obterConsultas(data).then(response => {
      if (response.sucesso) {
        this.medicoEscolhido = this.medico;
        this.lugarEscolhido = this.lugar;
        this.diaDeEscolhido = this.diaDe;
        this.diaAteEscolhido = this.diaAte;
        this.data = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  async atualizarCalendarioSemRequest(data: string, type: string, content?: any): Promise<void> {
    const types = ['status'];
    if (types.indexOf(type) === -1) { throw new Error('Type de atualização de calendário inválida'); }
    const indexData = this.obterIndex(data);
    const indexHora = this.data[indexData].horarios.map(e => e.hora).indexOf(content.Hora);
    if (indexData === -1 || indexHora === -1) { return; }
    switch (type) {
      case 'status':
        console.log(data, type, content);
        if (content.IdStatusConsulta === 6) {
          this.data[indexData].horarios[indexHora].consulta.dataStatusConsulta = content.DataStatusConsulta;
          this.data[indexData].horarios[indexHora].consulta = null;
          return;
        }
        this.data[indexData].horarios[indexHora].consulta.dataStatusConsulta = content.DataStatusConsulta;
        const codigoStatus = this.statusConsultas.filter(e => e.id === content.IdStatusConsulta)[0].codigo;
        this.data[indexData].horarios[indexHora].consulta.codigoStatusConsulta = codigoStatus;
        break;
    }
  }

  async mostrarLegendas() {
    this.dialogService.open(
      LegendasComponent,
      {
        context: {
          statusConsultas: this.statusConsultas,
          tiposAtendimentos: this.tiposAtendimentos
        },
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
          medico: this.listaMedicos.filter(e => e.id === this.medicoEscolhido)[0],
          consultorio: this.listaConsultorios.filter(e => e.idConsultorio === this.lugarEscolhido)[0],
          data: data,
          tiposAtendimento: this.tiposAtendimentos,
          ehEncaixe: data.ehEncaixe
        },
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    ).onClose.subscribe(async resultado => {
      if (resultado) {
        await this.atualizarCalendario();
        this.obterGrupoClick();
        this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
      }
    });
  }

  alterarStatus(data) {
    this.dialogService.open(
      AlterarStatusComponent,
      {
        context: {
          data: data,
          statusConsultas: this.statusConsultas
        },
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    ).onClose.subscribe(async resultado => {
      if (resultado) {
        await this.atualizarCalendario();
        this.obterGrupoClick();
        this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
      }
    });
  }

  infoConsulta(data) {
    console.log(data);
    this.dialogService.open(
      DetalhesConsultaComponent,
      {
        context: {
          dados: data,
          medico: this.listaMedicos.filter(e => e.id === this.medicoEscolhido)[0],
          consultorio: this.listaConsultorios.filter(e => e.idConsultorio === this.lugarEscolhido)[0],
          status: this.statusConsultas.filter(e => e.codigo === data.consulta.codigoStatusConsulta)[0],
          atendimento: this.tiposAtendimentos.filter(e => e.codigo === data.consulta.codigoTipoConsulta)[0],
          tiposAtendimentos: this.tiposAtendimentos
        },
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    ).onClose.subscribe(async resultado => {
      if (resultado) {
        await this.atualizarCalendario();
        this.obterGrupoClick();
        this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
      }
    });
  }

  bloqueio(data) {
    this.dialogService.open(
      BloqueioComponent,
      {
        context: {
          dados: data,
          listaMedicos: this.listaMedicos,
          listaConsultorios: this.listaConsultorios,
          medico: this.medicoEscolhido,
          lugar: this.lugarEscolhido
        },
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    ).onClose.subscribe(async resultado => {
      if (resultado) {
        await this.atualizarCalendario();
        this.obterGrupoClick();
        this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
      }
    });
  }
}
