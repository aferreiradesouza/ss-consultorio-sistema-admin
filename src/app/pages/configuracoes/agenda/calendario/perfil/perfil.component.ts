import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'ngx-perfil-agenda-calendario',
    templateUrl: 'perfil.component.html'
})

export class PerfilAgendaCalendarioComponent implements OnInit {
    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<PerfilAgendaCalendarioComponent>) { }

    async ngOnInit() {
    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }
}
