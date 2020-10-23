import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-channel-attribute-renderer',
  template: `<nb-user [picture]="rowData.urlFoto" [name]="rowData.nome"></nb-user>`,
  styles: [`
    :host nb-user div.user-container div.user-picture {
      background-position: center;
    }
  `]
})
export class UnidadesCellComponent {

constructor() { }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

}
