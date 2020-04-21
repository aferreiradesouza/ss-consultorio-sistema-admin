import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { MENU_ITEMS_ADM, MENU_ITEMS_MED, MENU_ITEMS_RECEP } from '../../pages/pages-menu';
import { NbMenuItem } from '@nebular/theme';

@Injectable({ providedIn: 'root' })
export class PermissaoGuard implements CanActivate {
    constructor(public localStorage: LocalStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const login = this.localStorage.getJson('login');
        // let menu: NbMenuItem[];
        // if (login.ehAdministrador) {
        //     menu = MENU_ITEMS_ADM;
        // } else if (login.ehMedico) {
        //     menu = MENU_ITEMS_MED;
        // } else (login.ehRecepcionista); {
        //     menu = MENU_ITEMS_RECEP;
        // }
        // const teste = this.temPermissao(state.url, menu);
        return true;
    }

    temPermissao(route: string, menu: NbMenuItem[]): boolean {
        const a = this.avaliarRota(menu, route);
        return a;
    }

    avaliarRota(menu: NbMenuItem[], route: string): boolean {
        let ret = false;
        for (const item of menu) {
            if (item.url === route) {
                ret = true;
                break;
            } else if (item.children && item.children.length) {
                ret = this.avaliarRota(item.children, route);
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
}
