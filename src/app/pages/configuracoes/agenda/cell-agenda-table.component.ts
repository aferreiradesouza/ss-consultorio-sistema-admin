import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-channel-attribute-renderer',
  template: `<nb-user [picture]="rowData.consultorio.urlFoto" [name]="rowData.consultorio.nome"></nb-user>`,
  styles: [`
    :host /deep/ nb-user div.user-container div.user-picture {
      background-position: center;
    }
  `]
})
export class CellAgendaTableComponent {

constructor() { }
  renderValue: string;
  @Input() value: any;
  @Input() rowData: any;
}
