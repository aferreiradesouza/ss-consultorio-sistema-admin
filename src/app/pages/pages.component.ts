import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS_ADM, MENU_ITEMS_MED, MENU_ITEMS_RECEP, MENU_ITEMS_DEFAULT } from './pages-menu';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Usuario } from '../shared/interface';
import { NbMenuItem } from '@nebular/theme';

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
    let types = [];
    if (user.ehAdministrador) {
      types.push('adm');
    } 
    if (user.ehMedico) {
      types.push('med');
    } 
    if (user.ehRecepcionista) {
      types.push('recep');
    }
    this.menu = this.obterMenu(types);
  }

  obterMenu(types) {
    let listaMenus: any[] = [];

    listaMenus.push(...MENU_ITEMS_DEFAULT);

    types.forEach(type => {
      switch (type) {
        case 'adm':
          listaMenus.push(...MENU_ITEMS_ADM);
          break;
        case 'med':
          listaMenus.push(...MENU_ITEMS_MED);
          break;
        case 'recep':
          listaMenus.push(...MENU_ITEMS_RECEP);
          break;
      }
    });

    const result = [];
    const map = new Map();
    for (const item of listaMenus) {
        if(!map.has(item.title)){
            map.set(item.title, true);    
            result.push(item);
        }
    }

    result.sort(function (a, b) {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
    return result;
  }
}
