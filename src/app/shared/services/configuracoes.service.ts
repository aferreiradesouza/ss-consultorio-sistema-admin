import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IListagemUsuario, IInfoUsuario, Usuario, IAlterarUsuario, IAdicionarUsuario, IDeletarUsuario, IListagemConsultoriosUsuario, IListagemConsultorio, IConsultorio, IEditarConsultorio, IDeletarConsultorio, ICriarConsultorio, IObterAgenda, ICriarAgenda, IDeletarAgenda, IObterAgendaID, IObterBloqueios, IAlterarAgenda, IRemoverBloqueios, IObterListagemEspecialidades, IObterAnamnese, ICriarAnamnese, IAlterarAnamnese, ICriarDocumento, ListagemDocumentos, IListarDocumento, IEditarDocumento } from '../interface';

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

    async alterarAgenda(data) {
        const url = `${environment.urlBase}admin/agenda/alterarAgenda`;
        const response = await this.ajax.post<IAlterarAgenda>(url, data);
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

    async obterBloqueios() {
        const url = `${environment.urlBase}admin/agenda/obterBloqueios`;
        const response = await this.ajax.get<IObterBloqueios>(url);
        return response;
    }

    async deletarBloqueio(id: number) {
        const url = `${environment.urlBase}admin/agenda/removerBloqueio/${id}`;
        const response = await this.ajax.delete<IRemoverBloqueios>(url);
        return response;
    }

    async obterListagemEspecialidade() {
        const url = `${environment.urlBase}admin/especialidade`;
        const response = await this.ajax.get<IObterListagemEspecialidades>(url);
        return response;
    }

    async obterAnamnese(id: number) {
        const url = `${environment.urlBase}admin/cadastro/obterAnamnese/${id}`;
        const response = await this.ajax.get<IObterAnamnese>(url);
        return response;
    }

    async criarAnamnese(data) {
        const url = `${environment.urlBase}admin/cadastro/criarAnamnese`;
        const response = await this.ajax.post<ICriarAnamnese>(url, data);
        return response;
    }

    async alterarAnamnese(data) {
        const url = `${environment.urlBase}admin/cadastro/alterarAnamnese`;
        const response = await this.ajax.post<IAlterarAnamnese>(url, data);
        return response;
    }

    async criarDocumento(data) {
        const url = `${environment.urlBase}admin/cadastro/criarTemplateDocumento`;
        const response = await this.ajax.post<ICriarDocumento>(url, data);
        return response;
    }

    async editarDocumento(data) {
        const url = `${environment.urlBase}admin/cadastro/alterarTemplateDocumento`;
        const response = await this.ajax.post<IEditarDocumento>(url, data);
        return response;
    }

    async listarDocumentos(idMedico) {
        const url = `${environment.urlBase}admin/cadastro/obterTemplatesDocumentos/${idMedico}`;
        const response = await this.ajax.get<IListarDocumento>(url);
        return response;
    }
}
