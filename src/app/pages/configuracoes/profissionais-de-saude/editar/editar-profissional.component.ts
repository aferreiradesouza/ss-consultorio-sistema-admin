import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-editar-profissional',
    templateUrl: 'editar-profissional.component.html',
})

export class EditarProfissionalComponent implements OnInit {

    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarProfissionalComponent>) { }

    ngOnInit() {
    }

    dismiss() {
        this.ref.close(false);
    }

    editar() {
        this.ref.close(true);
    }
}
