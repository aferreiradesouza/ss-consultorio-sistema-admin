import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-adicionar-unidade-atendimento',
    templateUrl: 'adicionar-unidade-atendimento.component.html'
})

export class AdicionarUnidadeAtendimentoComponent implements OnInit {
    form = new FormGroup({
        nome: new FormControl(''),
        telefone: new FormControl(''),
        cep: new FormControl(''),
        logradouro: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        status: new FormControl(true)
    });
    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<AdicionarUnidadeAtendimentoComponent>) { }

    ngOnInit() {
    }

    dismiss() {
        this.ref.close(false);
    }

    adicionar() {
        this.ref.close(true);
    }
}
