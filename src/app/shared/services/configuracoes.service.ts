import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IListagemUsuario, IInfoUsuario, Usuario, IAlterarUsuario, IAdicionarUsuario, IDeletarUsuario, IListagemConsultoriosUsuario, IListagemConsultorio, IConsultorio, IEditarConsultorio, IDeletarConsultorio, ICriarConsultorio, IObterAgenda, ICriarAgenda, IDeletarAgenda, IObterAgendaID } from '../interface';

@Injectable()
export class ConfiguracoesService {

    constructor(private ajax: AjaxService) { }

    async obterListagemUsuarios() {
        const url = `${environment.urlBase}admin/usuario`;
        return await this.ajax.get<IListagemUsuario>(url);
    }

    async obterInfoUsuario(id: number) {
        const url = `${environment.urlBase}admin/usuario/${id}`;
        return await this.ajax.get<IInfoUsuario>(url);
    }

    async alterarUsuario(data) {
        const url = `${environment.urlBase}admin/usuario/alterarPerfil`;
        return await this.ajax.post<IAlterarUsuario>(url, data);
    }

    async adicionarUsuario(data) {
        const url = `${environment.urlBase}admin/usuario/criar`;
        return await this.ajax.post<IAdicionarUsuario>(url, data);
    }

    async deletarUsuario(id) {
        const url = `${environment.urlBase}admin/usuario/${id}`;
        return await this.ajax.delete<IDeletarUsuario>(url);
    }

    async obterListagemConsultorios() {
        const url = `${environment.urlBase}admin/consultorio`;
        const response = await this.ajax.get<IListagemConsultorio>(url);
        return response;
    }

    async obterConsultorioPorId(id: number) {
        const url = `${environment.urlBase}admin/consultorio/${id}`;
        const response = await this.ajax.get<IConsultorio>(url);
        return response;
    }

    async editarConsultorio(data) {
        const url = `${environment.urlBase}admin/consultorio/alterarPerfil`;
        const response = await this.ajax.post<IEditarConsultorio>(url, data);
        return response;
    }

    async deletarConsultorio(id: number) {
        const url = `${environment.urlBase}admin/consultorio/${id}`;
        const response = await this.ajax.delete<IDeletarConsultorio>(url);
        return response;
    }

    async adicionarConsultorio(data) {
        const url = `${environment.urlBase}admin/consultorio/criar`;
        const response = await this.ajax.post<ICriarConsultorio>(url, data);
        return response;
    }

    async obterAgenda() {
        const url = `${environment.urlBase}admin/agenda/obterAgendas`;
        const response = await this.ajax.get<IObterAgenda>(url);
        return response;
    }

    async criarAgenda(data) {
        const url = `${environment.urlBase}admin/agenda/criarAgenda`;
        const response = await this.ajax.post<ICriarAgenda>(url, data);
        return response;
    }

    async deletarAgenda(id: number) {
        const url = `${environment.urlBase}admin/agenda/removerAgenda/${id}`;
        const response = await this.ajax.delete<IDeletarAgenda>(url);
        return response;
    }

    async obterAgendaPorId(id: number) {
        const url = `${environment.urlBase}admin/agenda/obterAgenda/${id}`;
        const response = await this.ajax.get<IObterAgendaID>(url);
        return response;
    }
}
