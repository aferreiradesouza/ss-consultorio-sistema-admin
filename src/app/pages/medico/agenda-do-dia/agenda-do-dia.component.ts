import { Component, OnInit } from '@angular/core';
import { CalendarioMockService } from '../../../@core/mock/calendario.service';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ListagemConsultoriosUsuario, StatusConsulta, TiposAtendimento } from '../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../shared/constants/toastr';

@Component({
  selector: 'ngx-agenda-do-dia',
  templateUrl: './agenda-do-dia.component.html',
  providers: [CalendarioMockService],
  styles: [`
    nb-card-header {
      align-items: center;

      > h5 {
      color: black;
      }
    }
    nb-select {
      min-width: 200px;
    }

    .msgError {
      font-size: 15px;
      font-weight: bold;
    }
  `]
})
export class AgendaDoDiaComponent implements OnInit {

  public isLoading = false;
  public data: any;
  public lugar: number;
  public medico: number;
  public lugarEscolhido: number;
  public dataEvent = null;
  public dataCalendarioDia = null;
  public statusConsultas: StatusConsulta[];
  public tiposAtendimentos: TiposAtendimento[];
  public listagemConsultorios: ListagemConsultoriosUsuario[] = [];

  constructor(
    public calendarioMock: CalendarioMockService,
    public calendarioService: CalendarioService,
    public recepcionistaService: RecepcionistaService,
    public localStorage: LocalStorageService,
    private toastrService: NbToastrService, ) { }

  async ngOnInit() {
    this.medico = this.localStorage.getJson('login').id;
    this.isLoading = true;
    await this.obterDadosIniciais();
    await this.recepcionistaService.obterConsultorios(this.medico).then(async response => {
      if (response.sucesso) {
        this.listagemConsultorios = response.resultado;
        this.lugar = this.listagemConsultorios[0].idConsultorio;
        this.lugarEscolhido = this.lugar;
        await this.obterConsulta();
      } else {
        this.listagemConsultorios = null;
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

  async obterConsulta(): Promise<void> {
    this.isLoading = true;
    const obj = {
      idMedico: this.medico,
      idConsultorio: this.lugarEscolhido,
      dataInicial: moment().subtract(1, 'month').format('YYYY-MM-DD'),
      dataFinal: moment().add(1, 'month').format('YYYY-MM-DD')
    };
    await this.recepcionistaService.obterConsultas(obj).then(response => {
      if (response.sucesso) {
        this.data = response.objeto;
        this.proximoDiaUtil();
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.data = null;
    }).finally(() => {
      this.isLoading = false;
    });
  }

  changeConsultorio(evento: number): void {
    this.lugarEscolhido = evento;
  }

  formatarHeader() {
    if (!this.dataEvent) {
      return '-';
    }
    return `${moment(this.dataEvent).date()} de
            ${this.calendarioService.formatarMes(moment(this.dataEvent).month()).extenso} de
            ${moment(this.dataEvent).year()},
            ${this.calendarioService.formatarDay(moment(this.dataEvent).day()).extenso}`;
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
    this.selecionarDiaNoCalendario();
  }

  selecionarDiaNoCalendario() {
    this.dataCalendarioDia = this.data.filter(e => moment(e.data).format('YYYY-MM-DD') === moment(this.dataEvent).format('YYYY-MM-DD'))[0];
  }

  async obterDadosIniciais(): Promise<void> {
    await Promise.all([this.obterStatusConsulta(), this.obterTiposAtendimento()]);
  }

  async obterStatusConsulta() {
    await this.recepcionistaService.obterStatusConsulta().then(response => {
      if (response.sucesso) {
        this.statusConsultas = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position});
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

  showCalendario(): boolean {
    for (const item of this.dataCalendarioDia.horarios) {
      if (item.consulta) {
        return true;
      }
    }
    return false;
  }
}
