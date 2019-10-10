import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
    selector: 'ngx-editar-agenda-calendario',
    templateUrl: 'editar.component.html'
})

export class EditarAgendaCalendarioComponent implements OnInit {
    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarAgendaCalendarioComponent>) { }

    async ngOnInit() {

    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }
}
