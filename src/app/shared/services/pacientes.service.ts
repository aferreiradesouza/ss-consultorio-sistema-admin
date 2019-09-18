import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { environment } from '../../../environments/environment';
import { ListagemPacientes, Paciente } from '../interface';

@Injectable()
export class PacientesService {

    constructor(public ajax: AjaxService) { }

    async obterPacientes() {
        const url = `${environment.urlBase}admin/paciente`;
        return await this.ajax.get<ListagemPacientes>(url);
    }

    async obterInfoPaciente(data) {
        const url = `${environment.urlBase}admin/paciente/${data}`;
        return await this.ajax.get<Paciente>(url);
    }
}
