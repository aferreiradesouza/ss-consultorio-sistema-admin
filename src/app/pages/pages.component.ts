import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS_ADM, MENU_ITEMS_MED, MENU_ITEMS_RECEP } from './pages-menu';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Usuario } from '../shared/interface';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  public menu: any;
  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    const user = <Usuario>this.localStorage.getJson('login');
    let type;
    if (user.ehAdministrador) {
      type = 'adm';
    } else if (user.ehMedico) {
      type = 'med';
    } else {
      type = 'recep';
    }
    this.menu = this.obterMenu(type);
  }

  obterMenu(type: 'adm' | 'med' | 'recep') {
    switch (type) {
      case 'adm':
        return MENU_ITEMS_ADM;
      case 'med':
        return MENU_ITEMS_MED;
      case 'recep':
        return MENU_ITEMS_RECEP;
    }
  }
}
