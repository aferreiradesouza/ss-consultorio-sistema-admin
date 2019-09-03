import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-editar-pacientes',
  templateUrl: 'editar.component.html'
})
export class EditarPacientesComponent implements OnInit {

  public isLoading = false;
  public form = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    cpf: new FormControl(''),
    nascimento: new FormControl('')
  })

  @Input() id: number;

  constructor(
    protected ref: NbDialogRef<EditarPacientesComponent>,
    private service: SmartTableData) {}

  async ngOnInit() {
    await this.buscarPaciente();
  }

  async buscarPaciente() {
    this.isLoading = true;
    await this.service.getID(this.id).then(response => {
      this.isLoading = false;
    })
  }

  dismiss() {
    this.ref.close();
  }
}
