import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ConsultoriosData } from '../../../@core/data/consultorios';
import { FormatterService } from '../../../shared/services/formatter.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { PerfilUnidadeAtendimentoComponent } from './perfil/perfil-unidade-atendimento.component';
import { EditarUnidadeAtendimentoComponent } from './editar/editar-unidade-atendimento.component';
import { AdicionarUnidadeAtendimentoComponent } from './adicionar/adicionar-unidade-atendimento.component';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { ListagemConsultorios } from '../../../shared/interface';
import { UnidadesCellComponent } from './unidadesCell.component';
import { TOASTR } from '../../../shared/constants/toastr';

@Component({
  selector: 'ngx-unidades-de-atendimento',
  templateUrl: './unidades-de-atendimento.component.html',
  styleUrls: ['unidades-de-atendimento.component.scss'],
  entryComponents: [UnidadesCellComponent]
})
export class UnidadesDeAtendimentoComponent implements OnInit {
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
          title: '<i class="nb-search"></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      nome: {
        title: 'Nome',
        type: 'custom',
        renderComponent: UnidadesCellComponent
      },
      bairro: {
        title: 'Bairro',
        type: 'string'
      },
      telefone1: {
        title: 'Telefone',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.formatterService.phoneFormat(value);
        }
      },
      ativo: {
        title: 'Status',
        type: 'boolean',
        valuePrepareFunction: (value) => {
          return value ? 'Ativo' : 'Inativo';
        }
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  public consultorios: ListagemConsultorios[];
  public isLoading = false;

  constructor(
    public consultoriosService: ConsultoriosData,
    public formatterService: FormatterService,
    public dialogService: NbDialogService,
    private configuracaoService: ConfiguracoesService,
    private toastrService: NbToastrService) {
  }

  async ngOnInit() {
    await this.obterListagem();
  }

  async obterListagem(): Promise<void> {
    this.isLoading = true;
    await this.configuracaoService.obterListagemConsultorios().then(response => {
      if (response.sucesso) {
        this.consultorios = response.objeto;
        this.source.load(this.consultorios);
      } else {
        this.consultorios = [];
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.consultorios = [];
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoading = false;
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
          field: 'bairro',
          search: query
        },
        {
          field: 'telefone',
          search: query
        },
      ], false);
    }
  }

  adicionar() {
    this.dialogService.open(
      AdicionarUnidadeAtendimentoComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  editar(event) {
    this.dialogService.open(
      EditarUnidadeAtendimentoComponent,
      {
        context: {
          id: event.data.id,
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  perfil(event) {
    this.dialogService.open(
      PerfilUnidadeAtendimentoComponent,
      {
        context: {
          id: event.data.id,
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  customAction(evento) {
    if (evento.action === 'edit') {
      this.editar(evento);
    } else if (evento.action === 'perfil') {
      this.perfil(evento);
    }
  }
}
