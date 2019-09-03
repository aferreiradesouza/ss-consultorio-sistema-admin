import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { EditarPacientesComponent } from '../editar/editar.component';

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
      position: 'right',
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
      id: {
        title: 'ID',
        type: 'number'
      },
      firstName: {
        title: 'Nome',
        type: 'string'
      },
      email: {
        title: 'E-mail',
        type: 'string'
      },
      age: {
        title: 'Age',
        type: 'number'
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    public router: Router,
    private dialogService: NbDialogService) {
    const data = this.service.getData();
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
          field: 'id',
          search: query
        },
        {
          field: 'firstName',
          search: query
        },
        {
          field: 'email',
          search: query
        }
      ], false);
    }
  }

  deletar(event) {
    console.log(event)
  }

  async editar(event) {
    this.dialogService.open(
      EditarPacientesComponent,
      {
        context: {
          id: event.data.id
        },
      });
  }

}
