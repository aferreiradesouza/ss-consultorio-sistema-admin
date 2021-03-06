import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { ListagemPacientes, ListagemUsuario, ListagemConsultoriosUsuario, TiposAtendimento, Especialidades, Paciente } from '../../../shared/interface';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { Router } from '@angular/router';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { TOASTR } from '../../../shared/constants/toastr';

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
  public camposRequired = false;
  public adcNovoPacienteActive = false;

  public form = new FormGroup({
    paciente: new FormControl(''),
    tipoAtendimento: new FormControl({ value: '', disabled: false }, [Validators.required]),
    especialidade: new FormControl({ value: '', disabled: false }, [Validators.required]),
    nascimento: new FormControl({ value: '', disabled: true }),
    cpf: new FormControl({ value: '', disabled: true }),
    telefone: new FormControl({ value: '', disabled: true }),
    celular: new FormControl({ value: '', disabled: true }),
    observacao: new FormControl({ value: '', disabled: true }),
  });

  @Input() medico: ListagemUsuario;
  @Input() consultorio: ListagemConsultoriosUsuario;
  @Input() data: any;
  @Input() ehEncaixe: boolean;
  @Input() tiposAtendimento: TiposAtendimento[];
  @Input() ehEditar = false;
  @Input() personEdit: Paciente = null;
  @Input() especialidade = null;
  @Input() tipoAtendimento = null;
  @Input() observacao?: string;

  constructor(
    protected ref: NbDialogRef<AgendarConsultaComponent>,
    private pacientesService: PacientesService,
    public recepcionistaService: RecepcionistaService,
    private toastrService: NbToastrService,
    private router: Router,
    public calendarioService: CalendarioService) { }

  async ngOnInit() {
    this.isLoading = true;
    await this.obterDados();
    if (this.ehEditar) {
      this.person = {
        nome: this.personEdit.nome,
        ativo: this.personEdit.ativo,
        celular: this.personEdit.celular,
        cpf: this.personEdit.cpf,
        dataDesativacao: this.personEdit.dataDesativacao,
        dataNascimento: this.personEdit.dataNascimento,
        email: this.personEdit.email,
        id: this.personEdit.id
      };
      setTimeout(() => {
        this.form.get('paciente').setValue(this.personEdit.nome);
        this.form.get('tipoAtendimento').setValue(this.tipoAtendimento);
        this.form.get('especialidade').setValue(this.especialidade);
        this.form.get('observacao').setValue(this.observacao);
      }, 0);
      this.selecionarPaciente(this.person);
    } else {
      setTimeout(() => {
        this.form.get('tipoAtendimento').setValue(this.tiposAtendimento[1].id);
        this.form.get('especialidade').setValue(this.especialidades[0].id);
      }, 0);
    }
    if (this.ehEncaixe) {
      const hora = this.calendarioService.hourToDecimal(this.data.hora);
      this.data.hora = this.calendarioService.decimalToHour(hora + 0.03);
    }
    this.isLoading = false;
  }

  async obterDados(): Promise<void> {
    await Promise.all([this.obterPacientes(), this.obterEspecialidades()]).catch(err => {
      this.dismiss();
    });
  }

  async obterPacientes() {
    await this.pacientesService.obterPacientes().then(response => {
      if (response.sucesso) {
        this.pacientes = response.objeto.filter(e => e.ativo);
      }
    });
  }

  async obterEspecialidades() {
    await this.recepcionistaService.obterEspecialidades(this.medico.id).then(response => {
      if (response.sucesso) {
        this.especialidades = response.objeto;
      } else {
        this.dismiss();
      }
    }).catch(err => {
      this.dismiss();
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
    if (!person) {
      this.person = person;
      return;
    }
    this.camposRequired = false;
    this.person = person;
    this.form.patchValue({
      nascimento: person.dataNascimento ? moment(person.dataNascimento).format('DD/MM/YYYY') : null,
      cpf: person.cpf,
      telefone: person.telefone,
      celular: person.celular,
    });
    this.form.get('tipoAtendimento').enable();
    this.form.get('especialidade').enable();
    this.form.get('observacao').enable();
  }

  async criarConsultaPacienteExistente() {
    this.isLoading = true;
    if (this.ehEditar) {
      await this.editar();
      this.isLoading = false;
      return;
    }
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
          { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
        this.criar();
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        this.dismiss();
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      this.dismiss();
    }).finally(() => {
      this.isLoading = true;
    });
  }

  async criarConsultaNovoPaciente() {
    this.isLoading = true;
    const objPaciente = {
      nome: this.form.get('paciente').value,
      cpf: this.form.get('cpf').value.replace(new RegExp(/[./-]/, 'g'), ''),
      celular: this.form.get('celular').value,
      telefone: this.form.get('telefone').value || null,
      dataNascimento: this.form.get('nascimento').value ? moment(this.form.get('nascimento').value, 'DD/MM/YYYY').format('YYYY-MM-DD') : null
    };
    await this.pacientesService.adicionarPaciente(objPaciente).then(async response => {
      if (response.sucesso) {
        if (this.ehEditar) {
          this.editar(response.objeto);
          return;
        }
        await this.criarConsulta(response.objeto);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  async editar(id?: number): Promise<void> {
    const obj = {
      id: this.data.consulta.id,
      idPaciente: id || this.person.id,
      idEspecialidade: this.form.get('especialidade').value,
      idTipoConsulta: this.form.get('tipoAtendimento').value,
      observacao: this.form.get('observacao').value
    };

    await this.recepcionistaService.alterarConsulta(obj).then(response => {
      if (response.sucesso) {
        this.toastrService.show('', 'Consulta alterada com sucesso',
          { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
        this.criar();
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    });
  }

  async criarConsulta(id: number): Promise<void> {
    const objConsulta = {
      idPaciente: id,
      idMedico: this.medico.id,
      idLocal: this.consultorio.idConsultorio,
      idEspecialidade: this.form.value.especialidade,
      idTipoConsulta: this.form.value.tipoAtendimento,
      data: this.data.data,
      hora: this.data.hora,
      observacao: this.form.value.observacao,
      ehEncaixe: this.ehEncaixe
    };
    await this.recepcionistaService.criarConsulta(objConsulta).then(resp => {
      if (resp.sucesso) {
        this.toastrService.show('', 'Consulta marcada com sucesso',
          { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
        this.criar();
      } else {
        this.toastrService.show('', resp.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        this.dismiss();
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      this.dismiss();
    });
  }

  shouldDisabledButton() {
    if (!this.adcNovoPacienteActive) {
      return this.person && this.form.get('especialidade').valid && this.form.get('tipoAtendimento').valid;
    } else {
      return (this.form.get('paciente').value && this.form.get('paciente').valid) &&
        this.form.get('tipoAtendimento').valid &&
        this.form.get('especialidade').valid &&
        (this.form.get('nascimento').value ? this.form.get('nascimento').valid : true) &&
        (this.form.get('cpf').value && this.form.get('cpf').valid) &&
        (this.form.get('celular').value && this.form.get('celular').valid) &&
        (this.form.get('telefone').value ? this.form.get('telefone').valid : true);
    }
  }

  adicionarPaciente() {
    this.resetForm();
    this.person = null;
    this.camposRequired = true;
    this.adcNovoPacienteActive = true;
    this.form.get('tipoAtendimento').enable();
    this.form.get('especialidade').enable();
    this.form.get('observacao').enable();
    this.form.get('nascimento').enable();
    this.form.get('cpf').enable();
    this.form.get('telefone').enable();
    this.form.get('celular').enable();
  }

  buscarPaciente() {
    this.resetForm();
    this.camposRequired = false;
    this.adcNovoPacienteActive = false;
    if (this.ehEditar) {
      this.form.get('tipoAtendimento').enable();
      this.form.get('especialidade').enable();
      this.form.get('observacao').disable();
    }
    this.form.get('nascimento').disable();
    this.form.get('cpf').disable();
    this.form.get('telefone').disable();
    this.form.get('celular').disable();
  }

  editarPaciente() {
    const link = `/pacientes/perfil?id=${this.person.id}`;
    this.router.navigate([]).then(() => { window.open(link, '_blank'); });
  }

  resetForm() {
    if (this.ehEditar) {
      this.form.get('paciente').reset();
      this.form.get('nascimento').reset();
      this.form.get('cpf').reset();
      this.form.get('telefone').reset();
      this.form.get('celular').reset();
    } else {
      this.form.get('paciente').reset();
      this.form.get('observacao').reset();
      this.form.get('nascimento').reset();
      this.form.get('cpf').reset();
      this.form.get('telefone').reset();
      this.form.get('celular').reset();
    }
  }
}
