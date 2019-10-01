import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { StatusConsulta, TiposAtendimento } from '../../../shared/interface';

@Component({
  selector: 'ngx-legendas',
  templateUrl: 'legendas.component.html',
  styleUrls: ['legendas.component.scss']
})
export class LegendasComponent implements OnInit {

  public isLoading: boolean;

  @Input() statusConsultas: StatusConsulta[];
  @Input() tiposAtendimentos: TiposAtendimento[];

  constructor(
    protected ref: NbDialogRef<LegendasComponent>) { }

  ngOnInit() {
    this.statusConsultas = this.statusConsultas.sort((a, b) => a.ordem - b.ordem);
  }

  dismiss() {
    this.ref.close(false);
  }

  deletar() {
    this.ref.close(true);
  }
}
