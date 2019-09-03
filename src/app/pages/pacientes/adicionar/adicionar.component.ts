import { Component, OnInit } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-adicionar-pacientes',
  templateUrl: './adicionar.component.html',
})
export class AdicionarPacientesComponent implements OnInit {
  constructor(private service: SmartTableData) {
  }

  async ngOnInit() {
    console.log(await this.service.getID(1))
  }
}
