import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EditarPacientesComponent } from '../editar/editar.component';
import { FormatterService } from '../../../shared/services/formatter.service';
import { LinkColComponent } from '../../../shared/components/custom-table/link-col.component';
import { DeletarPacientesComponent } from '../deletar/deletar.component';
import { PerfilPacientesComponent } from '../perfil/perfil.component';

@Component({
  selector: 'ngx-listagem-pacientes',
  templateUrl: './listagem.component.html',
  styleUrls: ['listagem.component.scss']
})
export class ListagemPacientesComponent {
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
          title: '<i class="nb-gear"></i>'
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
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmSave: true
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      nome: {
        title: 'Nome',
        type: 'string'
      },
      idade: {
        title: 'Idade',
        type: 'number'
      },
      email: {
        title: 'E-mail',
        type: 'string'
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

  constructor(
    private service: SmartTableData,
    public router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    public formatterService: FormatterService) {
    const data: any[] = this.service.getData();
    console.log(data);
    this.source.load(data);
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
    console.log('a');
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
        if (response) {
          const position: any = 'bottom-right';
          // tslint:disable-next-line: max-line-length
          this.toastrService.show('', `Paciente deletado com sucesso`,
            { status: 'danger', duration: 3000, position });
        }
      });
  }

  adicionarPaciente() {
    this.router.navigateByUrl('/pacientes/adicionar');
  }

  async editar(event) {
    console.log('a');
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
      }).onClose.subscribe(response => {
        if (response) {
          const position: any = 'bottom-right';
          // tslint:disable-next-line: max-line-length
          this.toastrService.show('', `Paciente alterado com sucesso`,
            { status: 'success', duration: 3000, position });
        }
      });
  }

  verPerfil(event) {
    this.dialogService.open(
      PerfilPacientesComponent,
      {
        context: {
          id: event.data.id,
          dados: event.data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      })
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
