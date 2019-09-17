import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-editar-unidade-atendimento',
    templateUrl: 'editar-unidade-atendimento.component.html',
})

export class EditarUnidadeAtendimentoComponent implements OnInit {
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
        status: new FormControl(false)
    });

    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarUnidadeAtendimentoComponent>) { }

    ngOnInit() {
        this.isLoading = true;
        setTimeout(() => {
            this.preencherForm();
            this.isLoading = false;
        }, 1000);
    }

    dismiss() {
        this.ref.close(false);
    }

    editar() {
        this.ref.close(true);
    }

    preencherForm() {
        this.form.patchValue({
            nome: 'Barra',
            telefone: '2133810462',
            cep: '31361360',
            logradouro: 'Av das américas',
            numero: '3500',
            complemento: 'Bloco 4 Toronto 3000 Sala 606',
            bairro: 'Barra',
            cidade: 'Rio de Janeiro',
            estado: 'RJ',
            status: true
        });
    }
}
