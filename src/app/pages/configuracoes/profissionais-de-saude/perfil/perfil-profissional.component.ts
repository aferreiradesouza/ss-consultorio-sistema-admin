import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-perfil-profissional',
    templateUrl: 'perfil-profissional.component.html'
})

export class PerfilProfissionalComponent implements OnInit {
    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<PerfilProfissionalComponent>) { }

    ngOnInit() {
    }

    dismiss() {
        this.ref.close(false);
    }

    editar() {
        this.ref.close(true);
    }
}
