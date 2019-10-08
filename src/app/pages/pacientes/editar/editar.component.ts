import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { Paciente } from '../../../shared/interface';
import { UtilService } from '../../../shared/services/util.service';

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
    uf: new FormControl(''),
    idade: new FormControl({ value: '', disabled: true }),
    status: new FormControl(false),
  });

  public sexo = new FormControl('');
  public comoConheceu = new FormControl('');
  public user: Paciente;
  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<EditarPacientesComponent>,
    private service: SmartTableData,
    public pacienteService: PacientesService,
    private utilService: UtilService) { }

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

    this.form.get('cep').valueChanges.subscribe(async (val: string) => {
      if (val && val.length === 10) {
        val = val.replace(new RegExp(/[./-]/, 'g'), '');
        await this.utilService.buscarCep(val).then(response => {
          this.form.get('bairro').setValue(response.objeto.bairro);
          this.form.get('logradouro').setValue(response.objeto.logradouro);
          this.form.get('cidade').setValue(response.objeto.municipio);
          this.form.get('uf').setValue(response.objeto.uf);
        });
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
    const form = this.form.value;
    const user = {
      id: this.user.id || null,
      nome: form.nome || null,
      cpf: form.cpf ? form.cpf.replace(new RegExp(/[./-]/, 'g'), '') : null,
      celular: form.celular || null,
      telefone: form.telefone || null,
      observacao: form.observacao || null,
      email: form.email || null,
      sexo: this.sexo.value || null,
      cep: form.cep ? form.cep.replace(new RegExp(/[./-]/, 'g'), '') : null,
      logradouro: form.logradouro || null,
      numero: form.numero || null,
      complemento: form.complemento || null,
      bairro: form.bairro || null,
      cidade: form.cidade || null,
      estado: form.uf || null,
      dataNascimento: form.nascimento ? moment(form.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
      ativo: form.status,
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
      idade: this.user.dataNascimento ? moment().diff(moment(this.user.dataNascimento), 'y') : '00',
      status: this.user.ativo,
      uf: this.user.estado
    });
    this.sexo.setValue(this.user.sexo);
  }
}
