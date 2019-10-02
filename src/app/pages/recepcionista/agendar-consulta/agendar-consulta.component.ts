import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-agendar-consulta',
  templateUrl: 'agendar-consulta.component.html',
  styleUrls: ['agendar-consulta.component.scss']
})
export class AgendarConsultaComponent implements OnInit {

  public isLoading: boolean;
  public form = new FormGroup({
    paciente: new FormControl(''),
    medico: new FormControl({value: '', disabled: true}),
    consultorio: new FormControl({value: '', disabled: true}),
    novoPaciente: new FormControl(false)
  });

  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<AgendarConsultaComponent>) { }

  ngOnInit() {
    (this.dados);
  }

  dismiss() {
    this.ref.close(false);
  }

  deletar() {
    this.ref.close(true);
  }
}
