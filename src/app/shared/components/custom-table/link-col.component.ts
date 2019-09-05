import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-link-col',
  template: `<a routerLink='/pacientes/adicionar'>{{value}}</a>`
})
export class LinkColComponent implements OnInit {

constructor() { }
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  ngOnInit() {
     this.renderValue =  '<' + this.value + '>';
  }

}