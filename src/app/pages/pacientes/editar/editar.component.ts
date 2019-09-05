import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

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
    idade: new FormControl({ value: '', disabled: true }),
  });

  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<EditarPacientesComponent>,
    private service: SmartTableData) { }

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

  dismiss() {
    this.ref.close(false);
  }

  editar() {
    this.ref.close(true);
  }

  async preencherFormulario(): Promise<void> {
    let user;
    this.isLoading = true;
    await this.service.getID(this.id).then(response => {
      user = response;
      this.isLoading = false;
    });
    this.form.patchValue({
      nome: user.nome,
      nascimento: moment(user.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY'),
      cpf: user.cpf,
      sexo: user.sexo,
      observacao: '',
      email: user.email,
      telefone: user.telefone,
      celular: user.celular,
      logradouro: user.logradouro,
      cep: user.cep,
      complemento: user.complemento,
      numero: user.numero,
      bairro: user.bairro,
      cidade: user.cidade,
      idade: user.idade,
    });
  }
}
