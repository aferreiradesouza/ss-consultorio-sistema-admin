import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { Paciente } from '../../../shared/interface';

@Component({
  selector: 'ngx-editar-pacientes',
  templateUrl: 'editar.component.html'
})
export class EditarPacientesComponent implements OnInit {

  public isLoading: boolean;
  public form = new FormGroup({
    nome: new FormControl(''),
    nascimento: new FormControl(''),
    cpf: new FormControl(''),
    observacao: new FormControl(''),
    email: new FormControl(''),
    telefone: new FormControl(''),
    celular: new FormControl(''),
    logradouro: new FormControl(''),
    cep: new FormControl(''),
    complemento: new FormControl(''),
    numero: new FormControl(''),
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    idade: new FormControl({ value: '', disabled: true }),
    status: new FormControl(false)
  });

  public sexo = new FormControl('', [Validators.required]);
  public user: Paciente;
  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<EditarPacientesComponent>,
    private service: SmartTableData,
    public pacienteService: PacientesService) { }

  async ngOnInit() {
    await this.preencherFormulario();

    this.form.get('nascimento').valueChanges.subscribe(val => {
      if (val.length === 10) {
        setTimeout(() => {
          const hoje = moment();
          const dataNascimento = moment(this.form.value.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
          const idade = hoje.diff(dataNascimento, 'years', false);
          this.form.get('idade').setValue(idade);
        }, 0);
      }
    });
  }

  getStatusSexo() {
    if (this.sexo.valid && this.sexo.dirty) {
      return 'success';
    } else if (!this.sexo.valid && this.sexo.dirty) {
      return 'danger';
    } else {
      return undefined;
    }
  }

  dismiss() {
    this.ref.close({ sucesso: false });
  }

  editar() {
    const user = {
      id: this.user.id,
      nome: this.form.value.nome,
      cpf: this.form.value.cpf,
      celular: this.form.value.celular,
      telefone: this.form.value.telefone,
      observacao: this.form.value.observacao || null,
      email: this.form.value.email,
      sexo: this.form.value.sexo,
      urlFoto: this.form.value.urlFoto,
      cep: this.form.value.cep,
      logradouro: this.form.value.logradouro,
      numero: this.form.value.numero,
      complemento: this.form.value.complemento,
      bairro: this.form.value.bairro,
      cidade: this.form.value.cidade,
      estado: this.form.value.estado,
      dataNascimento: this.form.value.nascimento,
      ativo: this.form.value.status,
    };
    this.ref.close({ sucesso: true, value: user });
  }

  async preencherFormulario(): Promise<void> {
    this.isLoading = true;
    await this.pacienteService.obterInfoPaciente(this.id).then(response => {
      this.user = response.objeto;
      this.isLoading = false;
    });
    this.form.patchValue({
      nome: this.user.nome,
      nascimento: moment(this.user.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY'),
      cpf: this.user.cpf,
      sexo: this.user.sexo,
      observacao: this.user.observacao,
      email: this.user.email,
      telefone: this.user.telefone,
      celular: this.user.celular,
      logradouro: this.user.logradouro,
      cep: this.user.cep,
      complemento: this.user.complemento,
      numero: this.user.numero,
      bairro: this.user.bairro,
      cidade: this.user.cidade,
      idade: moment().diff(moment(this.user.dataNascimento), 'y'),
      status: this.user.ativo
    });
    this.sexo.setValue(this.user.sexo);
  }
}
