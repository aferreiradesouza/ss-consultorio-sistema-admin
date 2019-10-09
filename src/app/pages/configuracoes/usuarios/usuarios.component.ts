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
import { DeletarUsuarioComponent } from './deletar/deletar.component';
import { TOASTR } from '../../../shared/constants/toastr';
import { AutenticacaoService } from '../../../shared/services/autenticacao.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

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
    private toastrService: NbToastrService,
    private authService: AutenticacaoService,
    private localStorageService: LocalStorageService) {
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.obterListagem();
    this.isLoading = false;
  }

  async obterListagem(): Promise<void> {
    await this.configuracoesService.obterListagemUsuarios().then(response => {
      if (response.sucesso) {
        this.usuarios = response.objeto;
        this.source.load(this.usuarios);
      } else {
        this.usuarios = [];
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.usuarios = [];
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
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
      }).onClose.subscribe(async (resp: { sucesso: boolean, mensagem: string }) => {
        if (resp.sucesso === null) {
          return;
        }
        this.toastrService.show('', resp.mensagem,
          { status: resp.sucesso ? 'success' : 'danger', duration: TOASTR.timer, position: TOASTR.position });
        if (resp.sucesso) {
          this.isLoading = true;
          await this.obterListagem();
          this.isLoading = false;
        }
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
        if (resp.sucesso === null) {
          return;
        }
        this.toastrService.show('', resp.mensagem,
          { status: resp.sucesso ? 'success' : 'danger', duration: TOASTR.timer, position: TOASTR.position });
        if (resp.sucesso) {
          this.isLoading = true;
          await this.obterListagem();
          await this.authService.verificarToken().then(response => {
            this.localStorageService.store('login', response.objeto);
          }).catch(() => {
            this.isLoading = false;
          });
          this.isLoading = false;
        }
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
        if (resp.sucesso === null) {
          return;
        }
        this.toastrService.show('', resp.mensagem,
          { status: resp.sucesso ? 'success' : 'danger', duration: TOASTR.timer, position: TOASTR.position });
      });
  }

  excluir(event) {
    this.dialogService.open(
      DeletarUsuarioComponent,
      {
        context: {
          id: event.data.id,
          dados: event.data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async (resp: { sucesso: boolean, mensagem: any }) => {
        if (resp.sucesso === null) {
          return;
        }
        const position: any = 'bottom-right';
        this.toastrService.show('', resp.mensagem,
          { status: resp.sucesso ? 'success' : 'danger', duration: TOASTR.timer, position: TOASTR.position });
        if (resp.sucesso) {
          this.isLoading = true;
          await this.obterListagem();
          this.isLoading = false;
        }
      });
  }

  customAction(evento) {
    if (evento.action === 'edit') {
      this.editar(evento);
    } else if (evento.action === 'perfil') {
      this.perfil(evento);
    } else if (evento.action === 'delete') {
      this.excluir(evento);
    }
  }
}
