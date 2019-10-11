import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosData } from '../../../@core/data/usuarios';
import { FormatterService } from '../../../shared/services/formatter.service';
import { ProfissionalData } from '../../../@core/data/profissional';
import { NbDialogService, NbToastrService, NbTabComponent } from '@nebular/theme';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../shared/constants/toastr';
import { Agenda, Consultorio, Usuario, Especialidades, ListagemUsuario, ListagemConsultorios, ListagemConsultoriosUsuario, ListagemBloqueio } from '../../../shared/interface';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { DATA_TABLE_CALENDARIO, DATA_TABLE_BLOQUEIO } from './data-table';
import { AdicionarAgendaCalendarioComponent } from './calendario/adicionar/adicionar.component';
import { EditarAgendaCalendarioComponent } from './calendario/editar/editar.component';
import { PerfilAgendaCalendarioComponent } from './calendario/perfil/perfil.component';
import { DeletarAgendaCalendarioComponent } from './calendario/deletar/deletar.component';

@Component({
  selector: 'ngx-agenda-configuracoes',
  templateUrl: './agenda.component.html',
  styleUrls: ['agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public search = '';
  public isLoadingCalendario = false;
  public isLoadingBloqueio = false;
  public isLoading = false;
  public agenda: Agenda[];
  public consultorios: ListagemConsultoriosUsuario[];
  public medicos: ListagemUsuario[];
  public medicosFiltrado: ListagemUsuario[];
  public showContent = false;
  public msgErro = null;
  public stepCalendario: 1 | 2 | 3 = 1;
  public stepBloqueio: 1 | 2 | 3 = 1;
  public medicoSelecionado: ListagemUsuario;
  public bloqueios: ListagemBloqueio[];
  sourceCalendario: LocalDataSource = new LocalDataSource();
  sourceBloqueio: LocalDataSource = new LocalDataSource();


  public settingsCalendario = DATA_TABLE_CALENDARIO as any;
  public settingsBloqueio = DATA_TABLE_BLOQUEIO as any;


  constructor(
    public profissionalService: ProfissionalData,
    private configuracoesService: ConfiguracoesService,
    public formatterService: FormatterService,
    public dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private calendarioService: CalendarioService,
    private recepcionistaService: RecepcionistaService) {
    this.settingsBloqueio.collumns = {
      ativo: {
        title: 'dwadaw',
        type: 'boolean'
      }
    };
    this.settingsCalendario.columns = {
      idConsultorio: {
        title: 'Consultório',
        type: 'string',
        valuePrepareFunction: (value) => {
          return `${this.consultorios.filter(e => e.idConsultorio === value)[0].nome}`;
        }
      },
      diaSemana: {
        title: 'Dia da semana',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.calendarioService.formatarDay(value).extenso;
        }
      },
      datas: {
        title: 'Vigência',
        type: 'string',
        valuePrepareFunction: (value) => {
          return `${moment(value.dataVigenciaInicio).format('DD/MM/YYYY')} - ${moment(value.dataVigenciaFim).format('DD/MM/YYYY')}`;
        }
      },
      horas: {
        title: 'Horário',
        type: 'string',
        valuePrepareFunction: (value) => {
          return `${value.horaInicio} - ${value.horaFim}`;
        }
      },
    };
  }

  async ngOnInit() {
    await this.obterMedico();
  }

  async obterMedico(): Promise<any> {
    this.isLoading = true;
    await this.recepcionistaService.obterMedicos().then(response => {
      if (response.sucesso) {
        this.showContent = true;
        this.medicos = response.resultado;
        this.medicosFiltrado = this.medicos;
      } else {
        this.toastrService.show('', response.error,
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        this.medicos = [];
        this.showContent = false;
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      this.medicos = [];
      this.showContent = false;
    }).finally(() => {
      this.isLoading = false;
    });
  }

  async obterAgendaCaledario() {
    this.isLoadingCalendario = true;
    this.agenda = [];
    this.sourceCalendario.load(this.agenda);
    await this.configuracoesService.obterAgenda().then(async response => {
      if (response.objeto) {
        this.agenda = response.objeto.filter(e => e.idUsuario === this.medicoSelecionado.id).map(e => {
          return {
            diaSemana: e.diaSemana,
            datas: { dataVigenciaInicio: e.dataVigenciaInicio, dataVigenciaFim: e.dataVigenciaFim },
            id: e.id,
            horas: { horaInicio: e.horaInicio, horaFim: e.horaFim },
            consultorio: e.consultorio,
            idConsultorio: e.idConsultorio
          } as any;
        });
        await this.obterConsultorios();
        this.sourceCalendario.load(this.agenda);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        this.agenda = [];
        this.sourceCalendario.load(this.agenda);
      }
    }).catch(err => {
      this.agenda = [];
      this.sourceCalendario.load(this.agenda);
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoadingCalendario = false;
    });
  }

  async obterBloqueio() {
    this.bloqueios = [];
    this.sourceBloqueio.load(this.bloqueios);
    this.isLoadingBloqueio = true;
    await this.configuracoesService.obterBloqueios().then(response => {
      if (response.sucesso) {
        this.bloqueios = response.objeto.filter(e => e.medico === this.medicoSelecionado.nome);
        console.log(this.bloqueios);
        this.sourceBloqueio.load(this.bloqueios);
      } else {
        this.bloqueios = [];
        this.sourceBloqueio.load(this.bloqueios);
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.bloqueios = [];
      this.sourceBloqueio.load(this.bloqueios);
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoadingBloqueio = false;
    });
  }

  async changeTab(type: NbTabComponent) {
    console.log(type);
    if (type.tabTitle === 'Calendário') {
      this.resetTabCalendario();
    } else {
      this.resetTabBloqueio();
    }
  }

  filtrarMedico(nome: string) {
    this.medicosFiltrado = this.medicos.filter(e => e.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()));
  }

  async obterConsultorios() {
    await this.recepcionistaService.obterConsultorios(this.medicoSelecionado.id).then(response => {
      if (response.sucesso) {
        this.consultorios = response.resultado;
      } else {
        this.toastrService.show('', response.error,
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    });
  }

  async selecionarMedico(medico: ListagemUsuario, type: 'calendario' | 'bloqueio') {
    this.medicoSelecionado = medico;
    if (type === 'calendario') {
      this.setStepCalendario(2);
      await this.obterAgendaCaledario();
    } else {
      this.setStepBloqueio(2);
      await this.obterBloqueio();
    }
  }

  setStepCalendario(num: 1 | 2 | 3) {
    this.stepCalendario = num;
  }

  setStepBloqueio(num: 1 | 2 | 3) {
    this.stepBloqueio = num;
  }

  resetTabCalendario() {
    this.search = '';
    this.agenda = null;
    this.setStepCalendario(1);
  }

  resetTabBloqueio() {
    this.search = '';
    this.setStepBloqueio(1);
  }

  customAction(evento) {
    if (evento.action === 'edit') {
      this.editarCalendario(evento);
    } else if (evento.action === 'perfil') {
      this.perfilCalendario(evento);
    } else if (evento.action === 'delete') {
      this.excluirCalendario(evento);
    }
  }


  adicionarCalendario() {
    this.dialogService.open(
      AdicionarAgendaCalendarioComponent,
      {
        context: {
          medico: this.medicoSelecionado,
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async e => {
        if (e) {
          await this.obterAgendaCaledario();
        }
      });
  }

  editarCalendario(event) {
    this.dialogService.open(
      EditarAgendaCalendarioComponent,
      {
        context: {
          id: event.data.id,
          dados: event.data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(e => {
        console.log(e);
      });
  }

  perfilCalendario(event) {
    this.dialogService.open(
      PerfilAgendaCalendarioComponent,
      {
        context: {
          id: event.data.id,
          medico: this.medicoSelecionado
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(e => {
        console.log(e);
      });
  }

  excluirCalendario(event) {
    this.dialogService.open(
      DeletarAgendaCalendarioComponent,
      {
        context: {
          id: event.data.id
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async e => {
        if (e) {
          await this.obterAgendaCaledario();
        }
      });
  }

}
