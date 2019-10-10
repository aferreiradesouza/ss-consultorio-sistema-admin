import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'ngx-deletar-agenda-calendario',
  templateUrl: 'deletar.component.html'
})
export class DeletarAgendaCalendarioComponent implements OnInit {
  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<DeletarAgendaCalendarioComponent>
    ) { }

  async ngOnInit() {
  }

  dismiss(type: boolean) {
    this.ref.close(type);
  }
}
