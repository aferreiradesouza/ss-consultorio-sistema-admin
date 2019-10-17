import { Component, OnInit, Input } from '@angular/core';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'ngx-channel-attribute-renderer',
  template: `<span [ngClass]="getClass()">{{value ? 'ATIVO' : 'INATIVO'}}</span>`,
  styles: [`
    span {
        font-size: 12px;
        font-weight: bold;
    }

    .ativo {
        color: green;
    }

    .inativo {
        color: red;
    }
  `]
})
export class CellStatusTableComponent {

constructor() { }
  renderValue: string;
  @Input() value: any;
  @Input() rowData: any;

  getClass() {
      const ret = [];
      if (this.value) { ret.push('ativo'); } else { ret.push('inativo'); }
      return ret;
  }
}
