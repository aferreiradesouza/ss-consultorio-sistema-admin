import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IObterDocumentoFormatado, ICriarTemplateConsulta, IObterConsultaMedico } from '../interface';

@Injectable()
export class AtendimentoService {

    constructor(private ajax: AjaxService) { }

    async obterListagemUsuarios(idConsulta, idTemplate) {
        const url = `${environment.urlBase}admin/agenda/consulta/obterTemplateDocumentoFormatado/${idConsulta}/${idTemplate}`;
        return await this.ajax.get<IObterDocumentoFormatado>(url);
    }

    async criarTemplate(data) {
        const url = `${environment.urlBase}admin/agenda/consulta/criarTemplateDocumento`;
        return await this.ajax.post<ICriarTemplateConsulta>(url, data);
    }

    async registrarAnamnese(data) {
        const url = `${environment.urlBase}admin/agenda/consulta/registrarAnamnese`;
        return await this.ajax.post<ICriarTemplateConsulta>(url, data);
    }

    async obterConsultaMedico(id) {
        const url = `${environment.urlBase}admin/agenda/obterConsultaMedico/${id}`;
        return await this.ajax.get<IObterConsultaMedico>(url);
    }
}
