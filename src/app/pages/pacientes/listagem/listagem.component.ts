import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { EditarPacientesComponent } from '../editar/editar.component';
import { FormatterService } from '../../../shared/services/formatter.service';

@Component({
  selector: 'ngx-listagem-pacientes',
  templateUrl: './listagem.component.html',
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
      edit: true,
      delete: true,
      position: 'right'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
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
    console.log(event);
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
      }).onClose.subscribe(response => {
        if (response) {
          const position: any = 'bottom-right';
          // tslint:disable-next-line: max-line-length
          this.toastrService.show('', `Paciente alterado com sucesso`,
          { status: 'success', duration: 3000, position });
        }
      });
  }

  teste(event) {
    console.log(event);
  }

}
