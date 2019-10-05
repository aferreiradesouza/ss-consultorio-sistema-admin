import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ListagemUsuario, ListagemConsultorios, StatusConsulta, TiposAtendimento, Paciente, Especialidades, InfoConsulta } from '../../../shared/interface';
import { AgendarConsultaComponent } from '../agendar-consulta/agendar-consulta.component';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { PacientesService } from '../../../shared/services/pacientes.service';

@Component({
  selector: 'ngx-detalhes-consulta',
  templateUrl: 'detalhes-consulta.component.html',
  styleUrls: ['detalhes-consulta.component.scss']
})
export class DetalhesConsultaComponent implements OnInit {

  public isLoading: boolean;
  public paciente: Paciente;
  public especialidades: Especialidades[];
  public consulta: InfoConsulta;
  public especialidadeConsulta: string;
  public consultaEditada: boolean;

  @Input() dados: any;
  @Input() medico: ListagemUsuario;
  @Input() consultorio: ListagemConsultorios;
  @Input() status: StatusConsulta;
  @Input() atendimento: TiposAtendimento;
  @Input() tiposAtendimentos: TiposAtendimento[];

  constructor(
    protected ref: NbDialogRef<DetalhesConsultaComponent>,
    private dialogService: NbDialogService,
    private recepcionistaService: RecepcionistaService,
    private toastrService: NbToastrService,
    public pacienteService: PacientesService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.obterEspecialidade();
    await this.obterDados();
    this.isLoading = false;
  }

  async obterDados(): Promise<void> {
    await this.recepcionistaService.obterConsultaId(this.dados.consulta.id).then(async response => {
      if (response.sucesso) {
        this.consulta = response.objeto;
        await this.obterInfoPaciente(response.objeto.idPaciente);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: 3000, position: <any>'bottom-right' });
        this.dismiss();
      }
    }).catch(err => {
      this.toastrService.show('', `Sistema indisponível no momento, tente novamente mais tarde.`,
        { status: 'danger', duration: 3000, position: <any>'bottom-right' });
      this.dismiss();
    });
  }

  dismiss() {
    this.ref.close(this.consultaEditada);
  }

  async obterEspecialidade(): Promise<void> {
    await this.recepcionistaService.obterEspecialidades(this.medico.id).then(response => {
      if (response.sucesso) {
        this.especialidades = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: 3000, position: <any>'bottom-right' });
        this.dismiss();
      }
    }).catch(err => {
      this.toastrService.show('', `Sistema indisponível no momento, tente novamente mais tarde.`,
        { status: 'danger', duration: 3000, position: <any>'bottom-right' });
      this.dismiss();
    });
  }

  async obterInfoPaciente(id: number): Promise<void> {
    this.isLoading = true;
    await this.pacienteService.obterInfoPaciente(id).then(async response => {
      if (response.sucesso) {
        this.paciente = response.objeto;
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: 3000, position: <any>'bottom-right' });
        this.dismiss();
      }
    }).catch(err => {
      this.toastrService.show('', `Sistema indisponível no momento, tente novamente mais tarde.`,
        { status: 'danger', duration: 3000, position: <any>'bottom-right' });
      this.dismiss();
    }).finally(() => {
      this.isLoading = false;
    });
  }

  editar() {
    this.dialogService.open(
      AgendarConsultaComponent,
      {
        context: {
          medico: this.medico,
          consultorio: this.consultorio,
          data: this.dados,
          tiposAtendimento: this.tiposAtendimentos,
          ehEncaixe: false,
          ehEditar: true,
          especialidade: this.consulta.idEspecialidade,
          tipoAtendimento: this.atendimento.id,
          personEdit: this.paciente
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    ).onClose.subscribe(async resultado => {
      if (resultado) {
        this.isLoading = true;
        await this.obterDados();
        this.consultaEditada = true;
        this.isLoading = false;
      }
    });
  }

  get descricaoEspecialidade() {
    if (!this.especialidades || !this.consulta) {
      return '-';
    }
    return this.especialidades.filter(e => e.id === this.consulta.idEspecialidade)[0].nome || '-';
  }
}
