import { Component, OnInit } from '@angular/core';
import { RecepcionistaService } from '../../../../shared/services/recepcionista.service';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { ListagemUsuario } from '../../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../../shared/constants/toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PREVIEW, IMPRIMIR } from '../../../../shared/constants/pdf';
import { TIPO_DOCUMENTO } from '../../../../shared/constants/tipo-documento';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-cadastro-documentos',
    templateUrl: 'cadastro-documentos.component.html'
})

export class CadastroDocumentosComponent implements OnInit {
    public isLoading: boolean;
    public listagemUsuario: ListagemUsuario[] = [];
    public form = new FormGroup({
        nome: new FormControl(''),
        tipo: new FormControl('', [Validators.required]),
        profissional: new FormControl('', [Validators.required]),
        texto: new FormControl('')
    });
    public tiposDocumento = TIPO_DOCUMENTO;

    constructor(
        public configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService,
        public router: Router) { }

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

    printDoc() {
        const popupWin = window.open('', '_blank', `width=${IMPRIMIR.width},height=${IMPRIMIR.height},location=no,left=200px`);
        popupWin.document.open();
        popupWin.document.write('<html><title>::Preview::</title></head><body onload="window.print()">');
        popupWin.document.write(this.form.value.texto);
        popupWin.document.write('</html>');
        popupWin.document.close();
    }

    printPreview() {
        const popupWin = window.open('', '_blank', `width=${PREVIEW.width},height=${PREVIEW.height},location=no,left=200px`);
        popupWin.document.open();
        popupWin.document.write('<html><title>::Print Preview::</title></head><body">');
        popupWin.document.write(this.form.value.texto);
        popupWin.document.write('</html>');
        popupWin.document.close();
    }

    async cadastrar() {
        this.isLoading = true;
        const documento = {
            idMedico: this.form.value.profissional,
            tipoTemplate: this.form.value.tipo,
            textoHtml: this.form.value.texto,
        };

        await this.configuracoesService.criarDocumento(documento).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Documento criado com sucesso!',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
                this.router.navigateByUrl('/cadastros/modelos-documentos');
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }

    voltar() {
        this.router.navigateByUrl('/cadastros/modelos-documentos');
    }

}
