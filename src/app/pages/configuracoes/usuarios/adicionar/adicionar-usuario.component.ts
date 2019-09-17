import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'ngx-adicionar-usuario',
    templateUrl: 'adicionar-usuario.component.html'
})

export class AdicionarUsuarioComponent implements OnInit {
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
        protected ref: NbDialogRef<AdicionarUsuarioComponent>) { }

    ngOnInit() {
    }

    dismiss() {
        this.ref.close(false);
    }

    adicionar() {
        this.ref.close(true);
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
