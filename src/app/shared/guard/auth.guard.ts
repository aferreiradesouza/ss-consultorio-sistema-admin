import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(public authService: AutenticacaoService, public router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const response = await this.authService.verificarToken();
        if (response.objeto) {
            return true;
        }
        this.router.navigateByUrl('/auth/login');
        return false;
    }
}
