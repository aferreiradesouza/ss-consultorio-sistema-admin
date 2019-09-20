import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-channel-attribute-renderer',
  template: `<nb-user [picture]="rowData.urlFoto" [name]="rowData.nome" [title]="rowData.ehMedico ? 'Médico' : undefined"></nb-user>`
})
export class UserCellComponent {

constructor() { }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

}
