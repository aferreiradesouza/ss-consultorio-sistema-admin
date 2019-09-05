import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-perfil-pacientes',
  templateUrl: 'perfil.component.html',
})
export class PerfilPacientesComponent implements OnInit {

  public isLoading: boolean;

  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<PerfilPacientesComponent>,
    private service: SmartTableData) { }

  async ngOnInit() {
  }

  dismiss() {
    this.ref.close(false);
  }

  perfil() {
    this.ref.close(true);
  }
}
