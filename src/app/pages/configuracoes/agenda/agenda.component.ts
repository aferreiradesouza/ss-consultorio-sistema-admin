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
import { UtilService } from '../../../shared/services/util.service';
import { EditarBloqueioComponent } from './bloqueio/editar/editar.component';
import { PerfilBloqueioComponent } from './bloqueio/perfil/perfil.component';
import { DeletarBloqueioComponent } from './bloqueio/deletar/deletar.component';
import { AdicionarBloqueioComponent } from './bloqueio/adicionar/adicionar.component';

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
  public consultorioSelecionado: string;
  public medicos: ListagemUsuario[];
  public medicosFiltrado: ListagemUsuario[];
  public showContent = false;
  public msgErro = null;
  public stepCalendario: 1 | 2 | 3 = 1;
  public stepBloqueio: 1 | 2 | 3 = 1;
  public medicoSelecionado: ListagemUsuario;
  public bloqueios: ListagemBloqueio[];
  source: LocalDataSource = new LocalDataSource();


  public settingsCalendario = DATA_TABLE_CALENDARIO;
  public settingsBloqueio = DATA_TABLE_BLOQUEIO as any;


  constructor(
    public profissionalService: ProfissionalData,
    private configuracoesService: ConfiguracoesService,
    public formatterService: FormatterService,
    public dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private calendarioService: CalendarioService,
    private recepcionistaService: RecepcionistaService,
    public utilService: UtilService,
    private utiLService: UtilService) {
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
    this.source.load(this.agenda);
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
        this.source.load(this.agenda);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        this.agenda = [];
        this.source.load(this.agenda);
      }
    }).catch(err => {
      this.agenda = [];
      this.source.load(this.agenda);
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoadingCalendario = false;
    });
  }

  async obterBloqueios() {
    this.bloqueios = [];
    this.source.load(this.bloqueios);
    this.isLoadingBloqueio = true;
    await this.configuracoesService.obterBloqueios().then(async response => {
      if (response.sucesso) {
        this.bloqueios = response.objeto.filter(e => e.medico === this.medicoSelecionado.nome).map(e => {
          return {
            consultorio: e.consultorio,
            datas: {dataInicio: e.dataInicio, dataFim: e.dataFim},
            id: e.id,
            horas: {horaInicio: e.dataInicio, horaFim: e.dataFim},
            ativo: e.ativo,
            observacao: e.observacao,
            medico: e.medico
          } as any;
        });
        await this.obterConsultorios();
        this.source.load(this.bloqueios);
      } else {
        this.bloqueios = [];
        this.source.load(this.bloqueios);
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.bloqueios = [];
      this.source.load(this.bloqueios);
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoadingBloqueio = false;
    });
  }

  async changeTab(type: NbTabComponent) {
    if (type.tabTitle === 'Calendário') {
      this.isLoadingCalendario = true;
      await this.utiLService.loading(500, () => this.isLoadingCalendario = false);
      this.resetTabCalendario();
    } else {
      this.isLoadingBloqueio = true;
      await this.utiLService.loading(500, () => this.isLoadingBloqueio = false);
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
      await this.obterBloqueios();
    }
  }

  async filtrarBloqueios(event) {
    this.isLoadingBloqueio = true;
    await this.utilService.loading(500, () => this.isLoadingBloqueio = false);
    if (event === 'todos') {
      this.source.load(this.bloqueios);
      return;
    }
    const bloqueios = this.bloqueios.filter(e => e.consultorio === event);
    this.source.load(bloqueios);
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
    this.consultorioSelecionado = 'todos';
  }

  customActionCalendario(evento) {
    if (evento.action === 'edit') {
      this.editarCalendario(evento);
    } else if (evento.action === 'perfil') {
      this.perfilCalendario(evento);
    } else if (evento.action === 'delete') {
      this.excluirCalendario(evento);
    }
  }

  customActionBloqueio(evento) {
    if (evento.action === 'edit') {
      this.editarBloqueio(evento);
    } else if (evento.action === 'perfil') {
      this.perfilBloqueio(evento);
    } else if (evento.action === 'delete') {
      this.excluirBloqueio(evento);
    }
  }


  adicionarCalendario() {
    this.dialogService.open(
      AdicionarAgendaCalendarioComponent,
      {
        context: {
          medico: this.medicoSelecionado,
        },
        closeOnEsc: false,
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
          medico: this.medicoSelecionado,
        },
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async e => {
        if (e) {
          await this.obterAgendaCaledario();
        }
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
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  excluirCalendario(event) {
    this.dialogService.open(
      DeletarAgendaCalendarioComponent,
      {
        context: {
          id: event.data.id
        },
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async e => {
        if (e) {
          await this.obterAgendaCaledario();
        }
      });
  }

  adicionarBloqueio() {
    this.dialogService.open(
      AdicionarBloqueioComponent,
      {
        context: {
          medico: this.medicoSelecionado,
          listagemConsultorios: this.consultorios
        },
        closeOnEsc: false,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async e => {
        if (e) {
          await this.obterBloqueios();
          this.consultorioSelecionado = 'todos';
          this.filtrarBloqueios(this.consultorioSelecionado);
        }
      });
  }

  editarBloqueio(event) {
    this.dialogService.open(
      EditarBloqueioComponent,
      {
        context: {
          id: event.data.id,
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

  perfilBloqueio(event) {
    this.dialogService.open(
      PerfilBloqueioComponent,
      {
        context: {
          id: event.data.id,
          medico: this.medicoSelecionado
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  excluirBloqueio(event) {
    this.dialogService.open(
      DeletarBloqueioComponent,
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
          this.consultorioSelecionado = 'todos';
          await this.obterBloqueios();
        }
      });
  }

}
