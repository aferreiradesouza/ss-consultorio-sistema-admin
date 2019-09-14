import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-alterar-status',
  templateUrl: 'alterar-status.component.html',
  styleUrls: ['alterar-status.component.scss']
})
export class AlterarStatusComponent implements OnInit {

  public isLoading: boolean;

  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<AlterarStatusComponent>) { }

  ngOnInit() {
    console.log(this.dados);
  }

  dismiss() {
    this.ref.close(false);
  }

  deletar() {
    this.ref.close(true);
  }
}
