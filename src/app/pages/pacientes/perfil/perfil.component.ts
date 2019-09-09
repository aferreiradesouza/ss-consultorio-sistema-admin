import { Component, Input, OnInit, AfterViewInit, AfterViewChecked, TemplateRef } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';
import * as moment from 'moment';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarPacientesComponent } from '../editar/editar.component';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'ngx-perfil-pacientes',
  templateUrl: 'perfil.component.html',
  styles: [`section {
    font-size: 12px;
  }

  .border-bottom {
    border-bottom: 1ox solid #ccc;
  }`]
})
export class PerfilPacientesComponent implements OnInit {

  public isLoading: boolean;
  public user: any;
  public timeline = [
    { data: '01/09/2019', local: 'Nova América', tipo: 'Clínico Geral', medico: 'André Domarco' },
    { data: '03/09/2019', local: 'Nova América', tipo: 'Clínico geral', medico: 'Rafael Silveira' },
    { data: '05/09/2019', local: 'Nova América', tipo: 'Clínico geral', medico: 'André Domarco' },
  ];
  source: LocalDataSource = new LocalDataSource();
  settings = {
    noDataMessage: 'Sem dados',
    hideSubHeader: true,
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      data: {
        title: 'Data do pagamento',
        type: 'string'
      },
      forma: {
        title: 'Forma de pagamento',
        type: 'number'
      },
    },
  };

  public formaPagamentos: any[] = [
    {data: '01/09/2019', forma: 'Cartão'},
    {data: '01/08/2019', forma: 'Dinheiro'},
    {data: '01/07/2019', forma: 'Dinheiro'},
    {data: '01/06/2019', forma: 'Cartão'},
  ];

  constructor(public route: ActivatedRoute,
    private service: SmartTableData, public menuService: NbMenuService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    public router: Router) { }

  async ngOnInit() {
    this.menuService.collapseAll();
    await this.obterUsuario();
    this.source.load(this.formaPagamentos);
  }

  async obterUsuario() {
    this.isLoading = true;
    const id = parseInt(this.route.snapshot.queryParams.id, 10);
    await this.service.getID(id).then(response => {
      this.user = response;
      this.isLoading = false;
    });
  }

  async editar() {
    this.dialogService.open(
      EditarPacientesComponent,
      {
        context: {
          id: this.user.id,
          dados: this.user
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }).onClose.subscribe(async response => {
        if (response) {
          const position: any = 'bottom-right';
          this.toastrService.show('', `Paciente alterado com sucesso`,
            { status: 'success', duration: 3000, position });
          await this.obterUsuario();
        }
      });
  }

  deletar(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Deseja realmente excluir esse paciente?' })
      .onClose.subscribe(response => {
        if (response) {
          const position: any = 'bottom-right';
          this.toastrService.show('', `Paciente excluído com sucesso`,
            { status: 'danger', duration: 3000, position });
          this.router.navigateByUrl('/pacientes/listagem');
        }
      });
  }
}
