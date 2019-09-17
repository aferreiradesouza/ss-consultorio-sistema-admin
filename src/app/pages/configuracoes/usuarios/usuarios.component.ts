import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosData } from '../../../@core/data/usuarios';

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['usuarios.component.scss']
})
export class UsuariosComponent {
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
      adm: {
        title: 'Administrador',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value ? 'Sim' : 'Não';
        }
      },
      status: {
        title: 'Status',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value ? 'Sim' : 'Não';
        }
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(public usuariosService: UsuariosData) {
    const data: any[] = this.usuariosService.getData();
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
      ], false);
    }
  }
}
