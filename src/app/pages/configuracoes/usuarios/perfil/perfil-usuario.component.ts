import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ngx-perfil-usuario',
    templateUrl: 'perfil-usuario.component.html'
})

export class PerfilUsuarioComponent implements OnInit {
    public form = new FormGroup({
        nome: new FormControl({value: '', disabled: true}),
        email: new FormControl({value: '', disabled: true}),
        nomeAbreviado: new FormControl({value: '', disabled: true})
    });

    perfis = new FormControl({value: [], disabled: true});

    public isLoading: boolean;
    public teste = [];

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<PerfilUsuarioComponent>) { }

    ngOnInit() {
        this.preencherPasso();
    }

    dismiss() {
        this.ref.close(false);
    }

    editar() {
        this.ref.close(true);
    }

    preencherPasso() {
        this.form.patchValue({
            nome: 'Arthur',
            email: 'arthur@gmail.com',
            nomeAbreviado: 'arthurfds'
        });
        this.perfis.setValue(['adminsitracao', 'estoque']);
    }
}
