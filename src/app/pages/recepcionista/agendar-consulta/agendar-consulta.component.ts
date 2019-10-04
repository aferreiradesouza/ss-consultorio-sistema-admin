import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { ListagemPacientes, ListagemUsuario, ListagemConsultorios, TiposAtendimento, Especialidades } from '../../../shared/interface';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';

@Component({
  selector: 'ngx-agendar-consulta',
  templateUrl: 'agendar-consulta.component.html',
  styleUrls: ['agendar-consulta.component.scss']
})
export class AgendarConsultaComponent implements OnInit {

  public isLoading: boolean;
  public pacientes: ListagemPacientes[];
  public especialidades: Especialidades[];
  public cpfDisabled = false;
  public person: ListagemPacientes = null;

  public form = new FormGroup({
    paciente: new FormControl(''),
    tipoAtendimento: new FormControl({ value: '', disabled: true }),
    especialidade: new FormControl({ value: '', disabled: true }),
    nascimento: new FormControl({ value: '', disabled: true }),
    cpf: new FormControl({ value: '', disabled: true }),
    telefone: new FormControl({ value: '', disabled: true }),
    celular: new FormControl({ value: '', disabled: true }),
    observacao: new FormControl({ value: '', disabled: true }),
  });

  @Input() medico: ListagemUsuario;
  @Input() consultorio: ListagemConsultorios;
  @Input() data: any;
  @Input() ehEncaixe: boolean;
  @Input() tiposAtendimento: TiposAtendimento[];

  constructor(
    protected ref: NbDialogRef<AgendarConsultaComponent>,
    private pacientesService: PacientesService,
    public recepcionistaService: RecepcionistaService,
    private toastrService: NbToastrService) { }

  async ngOnInit() {
    console.log(this.medico, this.consultorio, this.data);
    this.isLoading = true;
    await this.obterDados();
    this.isLoading = false;
  }

  async obterDados(): Promise<void> {
    Promise.all([this.obterPacientes(), this.obterEspecialidades()]).catch(err => {
      this.dismiss();
    });
  }

  async obterPacientes() {
    await this.pacientesService.obterPacientes().then(response => {
      if (response.sucesso) {
        this.pacientes = response.objeto;
      }
    });
  }

  async obterEspecialidades() {
    await this.recepcionistaService.obterEspecialidades(this.medico.id).then(response => {
      if (response.sucesso) {
        this.especialidades = response.objeto;
      }
    });
  }

  dismiss() {
    this.ref.close(false);
  }

  criar() {
    this.ref.close(true);
  }

  disabledButtonAddPaciente(): boolean {
    return this.form.get('paciente').value;
  }

  selecionarPaciente(person: any) {
    this.person = person;
    this.form.patchValue({
      nascimento: moment(person.dataNascimento).format('DD/MM/YYYY'),
      cpf: person.cpf,
      telefone: person.telefone,
      celular: person.celular,
    });
    this.form.get('tipoAtendimento').enable();
    this.form.get('especialidade').enable();
    this.form.get('observacao').enable();
  }

  async criarConsulta() {
    this.isLoading = true;
    const obj = {
      idPaciente: this.person.id,
      idMedico: this.medico.id,
      idLocal: this.consultorio.idConsultorio,
      idEspecialidade: this.form.value.especialidade,
      idTipoConsulta: this.form.value.tipoAtendimento,
      data: this.data.data,
      hora: this.data.hora,
      observacao: this.form.value.observacao,
      ehEncaixe: this.ehEncaixe
    };
    await this.recepcionistaService.criarConsulta(obj).then(response => {
      if (response.sucesso) {
        this.toastrService.show('', 'Consulta marcada com sucesso',
          { status: 'success', duration: 3000, position: <any>'bottom-right' });
        this.criar();
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: 3000, position: <any>'bottom-right' });
        this.dismiss();
      }
    }).catch(err => {
      this.toastrService.show('', `Sistema indisponível no momento, tente novamente mais tarde!`,
        { status: 'danger', duration: 3000, position: <any>'bottom-right' });
      this.dismiss();
    }).finally(() => {
      this.isLoading = true;
    });
  }
}
