import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { environment } from '../../../environments/environment';
import { IObterPaciente, IObterInfoPaciente, IEditarPaciente, IAdicionarPaciente, IExcluirPaciente } from '../interface';

@Injectable()
export class PacientesService {

    constructor(public ajax: AjaxService) { }

    async obterPacientes() {
        const url = `${environment.urlBase}admin/paciente`;
        return this.ajax.get<IObterPaciente>(url);
    }

    async obterInfoPaciente(data) {
        const url = `${environment.urlBase}admin/paciente/${data}`;
        return await this.ajax.get<IObterInfoPaciente>(url);
    }

    async editarPacientes(data) {
        const url = `${environment.urlBase}admin/paciente/alterarPerfil`;
        return await this.ajax.post<IEditarPaciente>(url, data);
    }

    async adicionarPaciente(data) {
        const url = `${environment.urlBase}admin/paciente/criar`;
        return await this.ajax.post<IAdicionarPaciente>(url, data);
    }

    async excluirPaciente(id: number) {
        const url = `${environment.urlBase}admin/paciente/${id}`;
        return await this.ajax.delete<IExcluirPaciente>(url);
    }
}
