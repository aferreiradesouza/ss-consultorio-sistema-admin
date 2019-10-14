import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ListagemUsuario } from '../../../../../shared/interface';

@Component({
    selector: 'ngx-editar-agenda-calendario',
    templateUrl: 'editar.component.html',
    styles: [`
    :host /deep/ nb-user div.user-container div.user-picture {
        background-position: center;
    }

    .errorMessage {
        color: red;
        margin-left: 15px;
        padding-top: 10px;
    }
    `]
})

export class EditarBloqueioComponent implements OnInit {
    public isLoading = false;

    @Input() id: number;
    @Input() medico: ListagemUsuario;

    constructor(
        protected ref: NbDialogRef<EditarBloqueioComponent>) { }

    async ngOnInit() {
    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }
}
