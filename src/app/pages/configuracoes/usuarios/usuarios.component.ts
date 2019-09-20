import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UsuariosData } from '../../../@core/data/usuarios';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { AdicionarUsuarioComponent } from './adicionar/adicionar-usuario.component';
import { EditarUsuarioComponent } from './editar/editar-usuario.component';
import { PerfilUsuarioComponent } from './perfil/perfil-usuario.component';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { ListagemUsuario } from '../../../shared/interface';
import { UserCellComponent } from './userCell.component';

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['usuarios.component.scss'],
  entryComponents: [UserCellComponent]
})
export class UsuariosComponent implements OnInit {
  public isLoading = false;
  public usuarios: ListagemUsuario[] = null;
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
          name: 'prontuario',
          title: '<i class="nb-compose"></i>'
        },
        {
          name: 'perfil',
          title: '<i class="nb-person"></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      nome: {
        title: 'Nome',
        type: 'custom',
        renderComponent: UserCellComponent
      },
      ehAdministrador: {
        title: 'Administrador',
        type: 'string',
        valuePrepareFunction: (value) => {
          return value ? 'Sim' : 'Não';
        }
      },
      ativo: {
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
    public dialogService: NbDialogService,
    public configuracoesService: ConfiguracoesService,
    private toastrService: NbToastrService) {
    const data: any[] = this.usuariosService.getData();
    this.source.load(data);
  }

  async ngOnInit() {
    await this.obterListagem();
  }

  async obterListagem(): Promise<void> {
    this.isLoading = true;
    await this.configuracoesService.obterListagemUsuarios().then(response => {
      this.usuarios = response.objeto;
      this.source.load(this.usuarios);
    });
    this.isLoading = false;
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

  editar(event) {
    this.dialogService.open(
      EditarUsuarioComponent,
      {
        context: {
          id: event.data.id,
          dados: event.data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async (resp: { sucesso: boolean, mensagem: string }) => {
        const position: any = 'bottom-right';
        this.toastrService.show('', resp.mensagem,
          { status: resp.sucesso ? 'success' : 'danger', duration: 3000, position });
        if (resp.sucesso) { await this.obterListagem(); }
      });
  }

  perfil(event) {
    this.dialogService.open(
      PerfilUsuarioComponent,
      {
        context: {
          id: event.data.id,
          dados: event.data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async (resp: { sucesso: boolean, mensagem: string }) => {
        const position: any = 'bottom-right';
        this.toastrService.show('', resp.mensagem,
          { status: resp.sucesso ? 'success' : 'danger', duration: 3000, position });
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
