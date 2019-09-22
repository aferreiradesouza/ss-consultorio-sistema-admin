import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-deletar-pacientes',
  templateUrl: 'deletar.component.html',
})
export class DeletarPacientesComponent implements OnInit {

  public isLoading: boolean;

  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<DeletarPacientesComponent>,
    private service: SmartTableData) { }

  async ngOnInit() {
  }

  dismiss() {
    this.ref.close({confirm: false, id: this.id});
  }

  deletar() {
    this.ref.close({confirm: true, id: this.id});
  }
}
