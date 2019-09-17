import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ConsultoriosData } from '../../../@core/data/consultorios';
import { FormatterService } from '../../../shared/services/formatter.service';
import { NbDialogService } from '@nebular/theme';
import { PerfilUnidadeAtendimentoComponent } from './perfil/perfil-unidade-atendimento.component';
import { EditarUnidadeAtendimentoComponent } from './editar/editar-unidade-atendimento.component';
import { AdicionarUnidadeAtendimentoComponent } from './adicionar/adicionar-unidade-atendimento.component';

@Component({
  selector: 'ngx-unidades-de-atendimento',
  templateUrl: './unidades-de-atendimento.component.html',
  styleUrls: ['unidades-de-atendimento.component.scss']
})
export class UnidadesDeAtendimentoComponent {
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
      ],
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      nome: {
        title: 'Nome',
        type: 'string'
      },
      bairro: {
        title: 'Bairro',
        type: 'string'
      },
      telefone: {
        title: 'Telefone',
        type: 'string',
        valuePrepareFunction: (value) => {
          return this.formatterService.phoneFormat(value);
        }
      },
      status: {
        title: 'Status',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value ? 'Ativo' : 'Inativo';
        }
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(
    public consultoriosService: ConsultoriosData,
    public formatterService: FormatterService,
    public dialogService: NbDialogService) {
    const data: any[] = this.consultoriosService.getData();
    this.source.load(data);
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

  editar() {
    this.dialogService.open(
      EditarUnidadeAtendimentoComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  perfil() {
    this.dialogService.open(
      PerfilUnidadeAtendimentoComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  customAction(evento) {
    if (evento.action === 'edit') {
      this.editar();
    } else if (evento.action === 'perfil') {
      this.perfil();
    }
  }
}
