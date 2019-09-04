import { Component, OnInit } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';

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
  })

  constructor(private service: SmartTableData) {
  }

  async ngOnInit() {
    console.log(await this.service.getID(1))
  }
}
