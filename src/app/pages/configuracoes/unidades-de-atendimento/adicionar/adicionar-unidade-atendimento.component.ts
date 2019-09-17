import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-adicionar-unidade-atendimento',
    templateUrl: 'adicionar-unidade-atendimento.component.html'
})

export class AdicionarUnidadeAtendimentoComponent implements OnInit {
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

    editar() {
        this.ref.close(true);
    }
}
