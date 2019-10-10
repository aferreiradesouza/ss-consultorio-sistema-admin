import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosData } from '../../../@core/data/usuarios';
import { FormatterService } from '../../../shared/services/formatter.service';
import { ProfissionalData } from '../../../@core/data/profissional';
import { NbDialogService, NbToastrService, NbTabComponent } from '@nebular/theme';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../shared/constants/toastr';
import { Agenda, Consultorio, Usuario, Especialidades, ListagemUsuario, ListagemConsultorios } from '../../../shared/interface';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { DATA_TABLE_CALENDARIO } from './data-table';
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
  public agenda: Agenda[];
  public consultorios: ListagemConsultorios[];
  public medicos: ListagemUsuario[];
  public medicosFiltrado: ListagemUsuario[];
  public showContent = false;
  public msgErro = null;
  public stepCalendario: 1 | 2 | 3 = 1;
  public medicoSelecionado: ListagemUsuario;
  source: LocalDataSource = new LocalDataSource();


  public settingsCalendario = DATA_TABLE_CALENDARIO as any;


  constructor(
    public profissionalService: ProfissionalData,
    private configuracoesService: ConfiguracoesService,
    public formatterService: FormatterService,
    public dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private calendarioService: CalendarioService,
    private recepcionistaService: RecepcionistaService) {
    this.settingsCalendario.columns = {
      diaSemana: {
        title: 'Dia da semana',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.calendarioService.formatarDay(value).extenso;
        }
      },
      horaInicio: {
        title: 'Hora Início',
        type: 'string'
      },
      horaFim: {
        title: 'Hora Fim',
        type: 'string',
      },
      dataVigenciaInicio: {
        title: 'Início da vigência',
        type: 'string',
        valuePrepareFunction: (value) => {
          return moment(value).format('DD/MM/YYYY');
        }
      },
      dataVigenciaFim: {
        title: 'Fim da vigência',
        type: 'string',
        valuePrepareFunction: (value) => {
          return moment(value).format('DD/MM/YYYY');
        }
      },
    };
  }

  async ngOnInit() {
  }

  async obterMedico(): Promise<any> {
    this.isLoadingCalendario = true;
    await this.recepcionistaService.obterMedicos().then(response => {
      if (response.sucesso) {
        this.showContent = true;
        this.medicos = response.resultado;
        this.medicosFiltrado = this.medicos;
        this.setStepCalendario(1);
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
      this.isLoadingCalendario = false;
    });
  }

  async obterAgendaCaledario() {
    this.isLoadingCalendario = true;
    this.agenda = [];
    this.source.load(this.agenda);
    await this.configuracoesService.obterAgenda().then(response => {
      if (response.objeto) {
        this.agenda = response.objeto.filter(e => e.idUsuario === this.medicoSelecionado.id);
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

  async changeTab(type: NbTabComponent) {
    console.log(type);
    if (type.tabTitle === 'Calendário') {
      this.resetTabCalendario();
      await this.obterMedico();
    } else {
      console.log('bloqueio');
    }
  }

  filtrarMedico(nome: string) {
    this.medicosFiltrado = this.medicos.filter(e => e.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()));
  }

  async selecionarMedico(medico: ListagemUsuario) {
    this.medicoSelecionado = medico;
    this.setStepCalendario(2);
    await this.obterAgendaCaledario();
  }

  setStepCalendario(num: 1 | 2 | 3) {
    this.stepCalendario = num;
  }

  resetTabCalendario() {
    this.search = '';
    this.agenda = null;
    this.setStepCalendario(1);
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
