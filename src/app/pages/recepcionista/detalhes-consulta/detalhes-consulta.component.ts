import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-detalhes-consulta',
  templateUrl: 'detalhes-consulta.component.html',
  styleUrls: ['detalhes-consulta.component.scss']
})
export class DetalhesConsultaComponent implements OnInit {

  public isLoading: boolean;

  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<DetalhesConsultaComponent>) { }

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
