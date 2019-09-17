import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'ngx-editar-usuario',
    templateUrl: 'editar-usuario.component.html',
})

export class EditarUsuarioComponent implements OnInit {
    public form = new FormGroup({
        nome: new FormControl(''),
        email: new FormControl(''),
        nomeAbreviado: new FormControl('')
    });

    perfis = new FormControl([], [Validators.required]);

    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarUsuarioComponent>) { }

    ngOnInit() {
        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            this.preencherPasso();
        }, 1000);
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

    showErrorSelect() {
        const control = this.perfis;
        if (!control.valid) {
            if (control.touched && control.dirty) {
                return 'danger';
            } else {
                return undefined;
            }
        } else {
            return 'success';
        }
    }
}
