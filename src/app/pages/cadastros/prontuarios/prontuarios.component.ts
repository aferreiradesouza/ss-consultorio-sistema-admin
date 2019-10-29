import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbToastrService, NbDatepickerComponent } from '@nebular/theme';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { PRONTUARIOS } from '../../../shared/constants/prontuarios';

@Component({
    selector: 'ngx-prontuarios',
    templateUrl: 'prontuarios.component.html',
    styles: [``]
})

export class ProntuariosComponent implements OnInit {

    public listaProntuarios = PRONTUARIOS;
    public form = new FormGroup({});

    constructor() {}

    ngOnInit() {
        this.initializeForm();
    }

    initializeForm() {
        this.listaProntuarios.forEach(e => {
            e.children.forEach(f => {
                this.addControl(f.control);
            });
        });
    }

    addControl(control: string) {
        this.form.addControl(control, new FormControl(true));
    }

    setValueOfClick(control) {
        const data = this.form.get(control).value;
        this.form.get(control).setValue(!data);
    }
}
