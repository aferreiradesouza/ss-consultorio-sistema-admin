import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosData } from '../../../@core/data/usuarios';
import { NbDialogService } from '@nebular/theme';
import { AdicionarUsuarioComponent } from './adicionar/adicionar-usuario.component';
import { EditarUsuarioComponent } from './editar/editar-usuario.component';
import { PerfilUsuarioComponent } from './perfil/perfil-usuario.component';

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
          return value ? 'Ativo' : 'Inativo';
        }
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(public usuariosService: UsuariosData,
    public dialogService: NbDialogService) {
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

  adicionar() {
    this.dialogService.open(
      AdicionarUsuarioComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  editar() {
    this.dialogService.open(
      EditarUsuarioComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      });
  }

  perfil() {
    this.dialogService.open(
      PerfilUsuarioComponent,
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
