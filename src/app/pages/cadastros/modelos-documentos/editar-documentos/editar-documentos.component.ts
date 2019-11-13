import { Component, OnInit, Input, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { ListagemUsuario } from '../../../../shared/interface';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { EditorComponent } from '../../../../shared/components';
import { UtilService } from '../../../../shared/services/util.service';
import { TIPO_DOCUMENTO } from '../../../../shared/constants/tipo-documento';
import { TOASTR } from '../../../../shared/constants/toastr';
import { PREVIEW } from '../../../../shared/constants/pdf';

@Component({
    selector: 'ngx-editar-modelos-documentos',
    templateUrl: 'editar-documentos.component.html'
})

export class EditarModelosDocumentosComponent implements OnInit {
    public isLoading: boolean;
    public tiposDocumento = TIPO_DOCUMENTO;
    @Input() id: number;
    @Input() data: any;

    public form = new FormGroup({
        nome: new FormControl(''),
        tipo: new FormControl(''),
        texto: new FormControl(''),
        status: new FormControl(false)
    });

    @ViewChild(EditorComponent, {static: false}) editor: EditorComponent;

    constructor(
        protected ref: NbDialogRef<EditarModelosDocumentosComponent>,
        public configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService,
        public router: Router,
        public utilService: UtilService) { }

    async ngOnInit() {
        console.log(this.data);
        this.isLoading = true;
        await this.utilService.loading(500, () => this.isLoading = false);
        setTimeout(() => {
            this.preencherForm();
        }, 0);
    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }

    preencherForm() {
        this.form.get('nome').setValue(this.data.nome);
        this.form.get('tipo').setValue(this.data.tipoTemplate);
        this.form.get('status').setValue(this.data.ativo);
        this.editor.adicionarTexto(this.data.textoHtml);
    }

    printPreview() {
        const popupWin = window.open('', '_blank', `width=${PREVIEW.width},height=${PREVIEW.height},location=no,left=200px`);
        popupWin.document.open();
        popupWin.document.write(`<html><title>${this.form.value.nome || '-'}</title></head><body">`);
        popupWin.document.write(this.form.value.texto);
        popupWin.document.write('</html>');
        popupWin.document.close();
    }

    async editar() {
        this.isLoading = true;
        const documento = {
            id: this.data.id,
            idMedico: this.data.idMedico,
            tipoTemplate: this.form.value.tipo,
            nome: this.form.value.nome,
            textoHtml: this.form.value.texto,
            ativo: this.form.value.status
        };

        await this.configuracoesService.editarDocumento(documento).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Documento editado com sucesso!',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
                    this.dismiss(true);
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
}
