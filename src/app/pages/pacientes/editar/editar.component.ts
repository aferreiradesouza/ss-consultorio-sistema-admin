import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-editar-pacientes',
  templateUrl: 'editar.component.html',
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
      nascimento: user.dataNascimento,
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
