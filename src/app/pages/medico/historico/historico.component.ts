import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
@Component({
  selector: 'ngx-historico-paciente',
  templateUrl: 'historico.component.html'
})
export class HistoricoPacienteComponent implements OnInit {

  @Input() id: number;

  public data = [1, 2, 3];

  constructor(
    protected ref: NbDialogRef<HistoricoPacienteComponent>) { }

  async ngOnInit() {
  }
}
