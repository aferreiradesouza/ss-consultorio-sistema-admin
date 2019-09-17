import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-adicionar-usuario',
    templateUrl: 'adicionar-usuario.component.html'
})

export class AdicionarUsuarioComponent implements OnInit {
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

    editar() {
        this.ref.close(true);
    }
}
