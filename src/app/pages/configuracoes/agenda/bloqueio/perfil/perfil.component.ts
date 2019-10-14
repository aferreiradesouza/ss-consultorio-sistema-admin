import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ListagemUsuario } from '../../../../../shared/interface';

@Component({
    selector: 'ngx-perfil-agenda-calendario',
    templateUrl: 'perfil.component.html',
    styles: [`
    :host /deep/ nb-user div.user-container div.user-picture {
        background-position: center;
    }
    `]
})

export class PerfilBloqueioComponent implements OnInit {
    public isLoading = false;

    @Input() id: number;
    @Input() medico: ListagemUsuario;

    constructor(
        protected ref: NbDialogRef<PerfilBloqueioComponent>) { }

    async ngOnInit() {
    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }
}
