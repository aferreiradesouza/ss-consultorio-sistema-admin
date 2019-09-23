import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'ngx-bloqueio',
  templateUrl: 'bloqueio.component.html',
  styleUrls: ['bloqueio.component.scss']
})
export class BloqueioComponent implements OnInit {

  public isLoading: boolean;

  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<BloqueioComponent>) { }

  ngOnInit() {
    (this.dados);
  }

  dismiss() {
    this.ref.close(false);
  }

  bloqueio() {
    this.ref.close(true);
  }
}
