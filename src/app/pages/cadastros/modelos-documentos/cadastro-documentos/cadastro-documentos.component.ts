import { Component, OnInit } from '@angular/core';
import { RecepcionistaService } from '../../../../shared/services/recepcionista.service';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { ListagemUsuario } from '../../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../../shared/constants/toastr';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-cadastro-documentos',
    templateUrl: 'cadastro-documentos.component.html'
})

export class CadastroDocumentosComponent implements OnInit {
    public isLoading: boolean;
    public listagemUsuario: ListagemUsuario[] = [];
    public form = new FormGroup({
        nome: new FormControl(''),
        tipo: new FormControl(''),
        profissional: new FormControl(''),
        texto: new FormControl('')
    });
    public tipos = [
        {nome: 'Atestado', id: 1},
        {nome: 'Laudo', id: 2},
        {nome: 'Receita', id: 3},
    ];

    constructor(
        public configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService) { }

    async ngOnInit() {
        await this.obterMedicos();
    }

    public async obterMedicos(): Promise<void> {
        this.isLoading = true;
        await this.configuracoesService.obterListagemUsuarios().then(resp => {
            if (resp.sucesso) {
                this.listagemUsuario = resp.objeto.filter(e => e.ehMedico && e.ativo).sort();
            } else {
                this.toastrService.show('', resp.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }


}
