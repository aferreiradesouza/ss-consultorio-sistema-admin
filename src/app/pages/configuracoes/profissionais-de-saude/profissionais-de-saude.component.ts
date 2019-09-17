import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosData } from '../../../@core/data/usuarios';
import { FormatterService } from '../../../shared/services/formatter.service';
import { ProfissionalData } from '../../../@core/data/profissional';
import { NbDialogService } from '@nebular/theme';
import { EditarProfissionalComponent } from './editar/editar-profissional.component';
import { AdicionarProfissionalComponent } from './adicionar/adicionar-profissional.component';
import { PerfilProfissionalComponent } from './perfil/perfil-profissional.component';

@Component({
  selector: 'ngx-profissionais-de-saude',
  templateUrl: './profissionais-de-saude.component.html',
  styleUrls: ['profissionais-de-saude.component.scss']
})
export class ProfissionaisDeSaudeComponent {
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
      email: {
        title: 'E-mail',
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
    public profissionalService: ProfissionalData,
    public formatterService: FormatterService,
    public dialogService: NbDialogService) {
    const data: any[] = this.profissionalService.getData();
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

  adicionar() {
    this.dialogService.open(
      AdicionarProfissionalComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  editar() {
    this.dialogService.open(
      EditarProfissionalComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  perfil() {
    this.dialogService.open(
      PerfilProfissionalComponent,
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
