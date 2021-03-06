import { Component, Input, OnInit, AfterViewInit, AfterViewChecked, TemplateRef } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';
import * as moment from 'moment';
import { NbMenuService, NbToastrService, NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarPacientesComponent } from '../editar/editar.component';
import { LocalDataSource } from 'ng2-smart-table';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { Paciente, StatusConsulta, TiposAtendimento } from '../../../shared/interface';
import { TOASTR } from '../../../shared/constants/toastr';
import { UtilService } from '../../../shared/services/util.service';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';


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
  public user: Paciente;
  public userConsultaFiltrado: Paciente;
  public statusConsultas: StatusConsulta[];
  public tiposAtendimentos: TiposAtendimento[];
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
    { data: '01/09/2019', forma: 'Cartão' },
    { data: '01/08/2019', forma: 'Dinheiro' },
    { data: '01/07/2019', forma: 'Dinheiro' },
    { data: '01/06/2019', forma: 'Cartão' },
  ];

  constructor(public route: ActivatedRoute,
    private service: SmartTableData, public menuService: NbMenuService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private pacienteService: PacientesService,
    public router: Router,
    private recepcionistaService: RecepcionistaService,
    private utilService: UtilService) { }

  async ngOnInit() {
    this.isLoading = true;
    this.menuService.collapseAll();
    await this.obterUsuario();
    await this.obterStatusConsulta();
    await this.obterTiposAtendimento();
    this.source.load(this.formaPagamentos);
    this.isLoading = false;
  }

  get ehMedicouOuAdministrador() {
    return UtilService.EhMedico() || UtilService.EhAdministrador();
  }

  async obterUsuario() {
    const id = parseInt(this.route.snapshot.queryParams.id, 10);
    await this.pacienteService.obterInfoPaciente(id).then(response => {
      if (response.sucesso) {
        this.user = response.objeto;
        this.userConsultaFiltrado = this.getConsultasFiltrado(response.objeto);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    });
  }

  async obterStatusConsulta() {
    await this.recepcionistaService.obterStatusConsulta().then(response => {
      if (response.sucesso) {
        this.statusConsultas = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    });
  }

  async obterTiposAtendimento() {
    await this.recepcionistaService.obterTiposAtendimento().then(response => {
      if (response.sucesso) {
        this.tiposAtendimentos = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
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
        if (response.sucesso) {
          this.isLoading = true;
          const resp = await this.editarPaciente(response.value);
          if (resp.sucesso) {
            this.toastrService.show('', `Paciente alterado com sucesso`,
              { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
            await this.obterUsuario();
          } else {
            this.toastrService.show('', resp.mensagem,
              { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
          }
          this.isLoading = false;
        }
      });
  }

  async editarPaciente(data): Promise<{ sucesso: boolean, mensagem?: string[] | boolean }> {
    return await this.pacienteService.editarPacientes(data)
      .then(response => {
        return { sucesso: response.sucesso, mensagem: response.sucesso ? null : response.objeto };
      });
  }

  deletar(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'Deseja realmente excluir esse paciente?' })
      .onClose.subscribe(async resp => {
        const position: any = 'bottom-right';
        if (resp) {
          await this.pacienteService.excluirPaciente(this.user.id).then(response => {
            if (response.sucesso) {
              this.toastrService.show('', `Paciente excluído com sucesso`,
                { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
              this.router.navigateByUrl('/pacientes/listagem');
            } else {
              this.toastrService.show('', response.mensagens[0],
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
          }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
              { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
          });
        }
      });
  }

  getIdade() {
    if (!this.user) { return; }
    return moment().diff(moment(this.user.dataNascimento), 'y');
  }

  getConsultasFiltrado(user: Paciente) {
    const usuario: Paciente = this.utilService.clone(user);
    usuario.consultas = usuario.consultas.filter(e => e.codigoStatusConsulta === 'atendimento_finalizado');
    return usuario;
  }
}
