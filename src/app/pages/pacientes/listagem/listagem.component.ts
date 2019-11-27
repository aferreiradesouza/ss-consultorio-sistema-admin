import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EditarPacientesComponent } from '../editar/editar.component';
import { FormatterService } from '../../../shared/services/formatter.service';
import { LinkColComponent } from '../../../shared/components/custom-table/link-col.component';
import { DeletarPacientesComponent } from '../deletar/deletar.component';
import { PerfilPacientesComponent } from '../perfil/perfil.component';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { ListagemPacientes } from '../../../shared/interface';
import * as moment from 'moment';
import { TOASTR } from '../../../shared/constants/toastr';

@Component({
  selector: 'ngx-listagem-pacientes',
  templateUrl: './listagem.component.html',
  styleUrls: ['listagem.component.scss']
})
export class ListagemPacientesComponent implements OnInit {
  public search = '';
  public isLoading = false;
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
        },
        {
          name: 'atendimento',
          title: '<i class="nb-compose"></i>'
        }
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
      dataNascimento: {
        title: 'Idade',
        type: 'number',
        valuePrepareFunction: (data) => {
          return data ? moment().diff(moment(data), 'y') : '-';
        }
      },
      email: {
        title: 'E-mail',
        type: 'string',
        valuePrepareFunction: (data) => {
          return data || '-';
        }
      },
      celular: {
        title: 'Celular',
        type: 'number',
        valuePrepareFunction: (tel) => {
          return this.formatterService.phoneFormat(tel);
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  pacientes: any;
  constructor(
    private service: SmartTableData,
    public router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    public formatterService: FormatterService,
    public pacientesService: PacientesService) {
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.obterListagem();
    this.isLoading = false;
  }

  async obterListagem(): Promise<void> {
    await this.pacientesService.obterPacientes().then(response => {
      response.objeto.forEach(e => {
        e.cpf = e.cpf.replace(new RegExp(/[.\-]/, 'g'), '');
      });
      this.pacientes = response;
      const data = response;
      this.source.load(data.objeto);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
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
          field: 'cpf',
          search: query
        },
        {
          field: 'email',
          search: query
        },
        {
          field: 'celular',
          search: query
        },
        {
          field: 'idade',
          search: query
        }
      ], false);
    }
  }

  deletar(event) {
    this.dialogService.open(
      DeletarPacientesComponent,
      {
        context: {
          id: event.data.id,
          dados: event.data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(response => {
        const position: any = 'bottom-right';
        this.isLoading = true;
        if (response.confirm) {
          this.pacientesService.excluirPaciente(response.id).then(async resp => {
            if (resp.sucesso) {
              this.toastrService.show('', `Paciente excluido com sucesso`,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
              this.search = '';
              await this.obterListagem();
            } else {
              this.toastrService.show('', resp.mensagens[0],
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
          }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
              { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
          });
        }
        this.isLoading = false;
      });
  }

  adicionarPaciente() {
    this.router.navigateByUrl('/pacientes/adicionar');
  }

  async editar(event) {
    this.dialogService.open(
      EditarPacientesComponent,
      {
        context: {
          id: event.data.id,
          dados: event.data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async (response: { sucesso: boolean, value: any }) => {
        if (response.sucesso) {
          this.isLoading = true;
          await this.editarPaciente(response.value).then(async resp => {
            if (resp.sucesso) {
              this.toastrService.show('', `Paciente alterado com sucesso`,
                { status: 'success', duration: 3000, position: TOASTR.position });
              await this.obterListagem();
            } else {
              this.toastrService.show('', resp.mensagem,
                { status: 'danger', duration: 3000, position: TOASTR.position });
            }
          }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
              { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
          });
          this.isLoading = false;
        }
      });
  }

  async editarPaciente(data): Promise<{ sucesso: boolean, mensagem?: string[] | boolean }> {
    return await this.pacientesService.editarPacientes(data)
      .then(response => {
        return { sucesso: response.sucesso, mensagem: response.sucesso ? null : response.objeto };
      });
  }

  verPerfil(event) {
    this.router.navigateByUrl(`/pacientes/perfil?id=${event.data.id}`);
  }

  customAction(event) {
    if (event.action === 'edit') {
      this.editar(event);
    } else if (event.action === 'delete') {
      this.deletar(event);
    } else {
      this.verPerfil(event);
    }
  }

}
