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

@Component({
  selector: 'ngx-agenda-configuracoes',
  templateUrl: './agenda.component.html',
  styleUrls: ['agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  public search = '';
  settings = {
    noDataMessage: 'Sem dados',
    hideSubHeader: true,
    mode: 'external',
    actions: {
      columnTitle: 'Ações',
      position: 'right',
      custom: [
        {
          name: 'perfil',
          title: '<i class="nb-person"></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      dataCadastro: {
        title: 'Data de cadastro',
        type: 'string',
        valuePrepareFunction: (value) => {
          return moment(value).format('DD/MM/YYYY');
        }
      },
      horaInicio: {
        title: 'Hora início',
        type: 'string'
      },
      horaFim: {
        title: 'Hora fim',
        type: 'string'
      },
      duracaoMinutos: {
        title: 'Minutos',
        type: 'string'
      },
      diaSemana: {
        title: 'Dia',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.calendarioService.formatarDay(value).extenso;
        }
      },
      Ativo: {
        title: 'Status',
        type: 'boolean',
        valuePrepareFunction: (value) => {
          return value ? 'Ativo' : 'Inativo';
        }
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  public isLoading = false;
  public agenda: Agenda[];
  public isLoadingCard = false;
  public consultorios: ListagemConsultorios[];
  public medicos: ListagemUsuario[];
  public showContent = false;
  public msgErro = null;

  constructor(
    public profissionalService: ProfissionalData,
    private configuracoesService: ConfiguracoesService,
    public formatterService: FormatterService,
    public dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private calendarioService: CalendarioService,
    private recepcionistaService: RecepcionistaService) {
  }

  async ngOnInit() {
    await this.obterDados();
  }

  async obterAgenda(): Promise<void> {
    this.isLoading = true;
    await this.configuracoesService.obterAgenda().then(response => {
      if (response.sucesso) {
        this.agenda = response.objeto;
        this.source.load(this.agenda);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
        this.agenda = [];
        this.source.load(this.agenda);
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
      this.agenda = [];
      this.source.load(this.agenda);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  async obterDados(): Promise<void> {
    this.isLoadingCard = true;
    await Promise.all([this.obterMedico(), this.obterConsultorio()]).then(response => {
      this.medicos = response[0];
      this.consultorios = response[1];
      this.showContent = true;
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
      this.agenda = [];
      this.msgErro = 'Ocorreu um erro em carregar a tela, tente novamente mais tarde.';
    }).finally(() => {
      this.isLoadingCard = false;
    });
  }

  async obterMedico(): Promise<any> {
    await this.recepcionistaService.obterMedicos().then(response => {
      if (response.sucesso) {
        return response.resultado;
      } else {
        new Error(response.error);
      }
    });
  }

  async obterConsultorio(): Promise<any> {
    await this.configuracoesService.obterListagemConsultorios().then(response => {
      if (response.sucesso) {
        return response.objeto;
      } else {
        new Error(response.mensagens[0]);
      }
    });
  }

  onSearch(query: string = '') {
    if (query === '') {
      this.source.reset();
    } else {
      this.source.setFilter([
        {
          field: 'nome',
          search: query
        },
        {
          field: 'email',
          search: query
        },
        {
          field: 'telefone',
          search: query
        },
      ], false);
    }
  }

  customAction(evento) {
    if (evento.action === 'edit') {
      // this.editar();
    } else if (evento.action === 'perfil') {
      // this.perfil();
    }
  }

  async changeTab(type: NbTabComponent) {
    console.log(type);
    type.tabTitle === 'Calendário' ? await this.obterAgenda() : console.log('bloqueio');
  }
}
