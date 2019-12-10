import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AjaxService } from './ajax.service';
import { IListagemUsuario, IInfoUsuario, Usuario, IAlterarUsuario, IAdicionarUsuario, IDeletarUsuario, IListagemConsultoriosUsuario, IListagemConsultorio, IConsultorio, IEditarConsultorio, IDeletarConsultorio, ICriarConsultorio, IObterAgenda, ICriarAgenda, IDeletarAgenda, IObterAgendaID, IObterBloqueios, IAlterarAgenda, IRemoverBloqueios, IObterListagemEspecialidades, IObterAnamnese, ICriarAnamnese, IAlterarAnamnese, ICriarDocumento, ListagemDocumentos, IListarDocumento, IEditarDocumento, IObterDocumentoFormatado } from '../interface';

@Injectable()
export class AtendimentoService {

    constructor(private ajax: AjaxService) { }

    async obterListagemUsuarios(idConsulta, idTemplate) {
        const url = `${environment.urlBase}admin/agenda/consulta/obterTemplateDocumentoFormatado/${idConsulta}/${idTemplate}`;
        return await this.ajax.get<IObterDocumentoFormatado>(url);
    }
}
