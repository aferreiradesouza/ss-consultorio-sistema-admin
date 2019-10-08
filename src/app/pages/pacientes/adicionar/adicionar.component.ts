import { Component, OnInit } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../shared/services/util.service';

@Component({
  selector: 'ngx-adicionar-pacientes',
  templateUrl: './adicionar.component.html',
})
export class AdicionarPacientesComponent implements OnInit {

  public form = new FormGroup({
    nome: new FormControl(''),
    nascimento: new FormControl(''),
    cpf: new FormControl(''),
    sexo: new FormControl(''),
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
    urlFoto: new FormControl(''),
    idade: new FormControl({ value: '', disabled: true }),
  });
  public sexo = new FormControl('');
  public comoConheceu = new FormControl('');

  public status: 'sucesso' | 'erro' = null;
  public msgAlert: string = null;
  public isLoading: boolean;

  constructor(
    private pacienteService: PacientesService,
    public router: Router,
    private utilService: UtilService) {
  }

  async ngOnInit() {
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

  async adicionar() {
    const form = this.form.value;
    const data = {
      nome: form.nome || null,
      cpf: form.cpf.replace(new RegExp(/[./-]/, 'g'), '') || null,
      celular: form.celular || null,
      telefone: form.telefone || null,
      observacao: form.observacao || null,
      email: form.email || null,
      sexo: this.sexo.value || null,
      cep: form.cep.replace(new RegExp(/[./-]/, 'g'), '') || null,
      logradouro: form.logradouro || null,
      numero: form.numero || null,
      complemento: form.complemento || null,
      bairro: form.bairro || null,
      cidade: form.cidade || null,
      estado: form.estado || null,
      dataNascimento: form.nascimento ? moment(form.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
    };
    this.isLoading = true;
    await this.pacienteService.adicionarPaciente(data).then(response => {
      this.status = null;
      if (response.sucesso) {
        this.status = 'sucesso';
        this.msgAlert = 'Paciente adiconado com sucesso. Estamos te redirecionando para a listagem de pacientes...';
        setTimeout(() => {
          this.router.navigateByUrl('/pacientes/listagem');
        }, 2000);
      } else {
        this.status = 'erro';
        this.msgAlert = response.mensagens[0];
      }
    }).catch(err => {
      this.status = 'erro';
      this.msgAlert = 'Sistema indisponível, tente novamente mais tarde.';
    });
    this.isLoading = false;
  }
}
