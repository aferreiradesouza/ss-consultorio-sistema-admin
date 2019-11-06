import { Component, OnInit, Input, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { ListagemUsuario } from '../../../../shared/interface';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { EditorComponent } from '../../../../shared/components';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
    selector: 'ngx-editar-modelos-documentos',
    templateUrl: 'editar-documentos.component.html'
})

export class EditarModelosDocumentosComponent implements OnInit {
    public isLoading: boolean;
    @Input() id: number;
    @Input() data: any;

    public form = new FormGroup({
        texto: new FormControl('')
    });

    @ViewChild(EditorComponent, {static: false}) editor: EditorComponent;

    constructor(
        protected ref: NbDialogRef<EditarModelosDocumentosComponent>,
        public configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService,
        public router: Router,
        public utilService: UtilService) { }

    async ngOnInit() {
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
        this.editor.adicionarTexto(this.data.textoHtml);
    }
}
