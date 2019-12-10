import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AtendimentoGuard implements CanActivate {
    constructor(public storageService: StorageService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storageService.storage.consulta) {
            return true;
        }
        this.router.navigateByUrl('/home');
        return false;
    }
}
