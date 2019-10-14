import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(public authService: AutenticacaoService, public router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let permitirUsuario: boolean;
        await this.authService.verificarToken().then(response => {
            permitirUsuario = response.sucesso && response.objeto;
        }).catch(err => {
            permitirUsuario = false;
        });
        if (!permitirUsuario) {
            this.router.navigateByUrl('/auth/login');
            return false;
        } else {
            return true;
        }
    }
}
