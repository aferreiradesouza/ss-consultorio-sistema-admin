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
    email: new FormControl(''),
    cpf: new FormControl(''),
    idade: new FormControl(''),
    celular: new FormControl(''),
    telefone: new FormControl('')
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
      nome: user.firstName,
      email: user.email,
      cpf: user.cpf,
      idade: user.age,
      celular: user.telefone,
      telefone: ''
    });
  }
}
