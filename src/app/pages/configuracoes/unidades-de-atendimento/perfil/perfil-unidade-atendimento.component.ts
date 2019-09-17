import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-perfil-unidade-atendimento',
    templateUrl: 'perfil-unidade-atendimento.component.html'
})

export class PerfilUnidadeAtendimentoComponent implements OnInit {
    form = new FormGroup({
        nome: new FormControl({value: '', disabled: true}),
        telefone: new FormControl({value: '', disabled: true}),
        cep: new FormControl({value: '', disabled: true}),
        logradouro: new FormControl({value: '', disabled: true}),
        numero: new FormControl({value: '', disabled: true}),
        complemento: new FormControl({value: '', disabled: true}),
        bairro: new FormControl({value: '', disabled: true}),
        cidade: new FormControl({value: '', disabled: true}),
        estado: new FormControl({value: '', disabled: true}),
        status: new FormControl({value: false, disabled: true})
    });

    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<PerfilUnidadeAtendimentoComponent>) { }

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
