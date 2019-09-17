import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-perfil-unidade-atendimento',
    templateUrl: 'perfil-unidade-atendimento.component.html'
})

export class PerfilUnidadeAtendimentoComponent implements OnInit {
    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<PerfilUnidadeAtendimentoComponent>) { }

    ngOnInit() {
    }

    dismiss() {
        this.ref.close(false);
    }

    editar() {
        this.ref.close(true);
    }
}
