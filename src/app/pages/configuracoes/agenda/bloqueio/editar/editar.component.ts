import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbDatepickerComponent, NbToastrService } from '@nebular/theme';
import { ListagemUsuario, ListagemConsultoriosUsuario } from '../../../../../shared/interface';
import * as moment from 'moment';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RecepcionistaService } from '../../../../../shared/services/recepcionista.service';
import { CalendarioService } from '../../../../../shared/services/calendarios.service';
import { TOASTR } from '../../../../../shared/constants/toastr';

interface Bloqueio {
    consultorio: {nome: string, urlFoto: string, idConsultorio: number};
    id: number;
    dataInicio: {dataInicio: string; horaInicio: string};
    dataFim: {dataFim: string; horaFim: string};
    ativo: boolean;
    observacao: string;
    medico: string;
}

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
    public isLoading: boolean;
    public consultorio: ListagemConsultoriosUsuario;

    public form = new FormGroup({
        lugar: new FormControl('', [Validators.required]),
        diaDe: new FormControl('', [Validators.required]),
        horaDe: new FormControl(''),
        diaAte: new FormControl('', [Validators.required]),
        horaAte: new FormControl(''),
        observacao: new FormControl(''),
        status: new FormControl(false)
    });

    @Input() id: number;
    @Input() medico: ListagemUsuario;
    @Input() listagemConsultorios: ListagemConsultoriosUsuario[];
    @Input() bloqueio: Bloqueio;


    @ViewChild('ate', { static: false }) datePicker: NbDatepickerComponent<any>;

    constructor(
        protected ref: NbDialogRef<EditarBloqueioComponent>,
        private toastrService: NbToastrService,
        private recepcionistaService: RecepcionistaService,
        private calendarioService: CalendarioService) { }

    async ngOnInit() {
        this.consultorio = this.listagemConsultorios.filter(e => e.idConsultorio === this.bloqueio.consultorio.idConsultorio)[0];
        this.preencherForm();
        setTimeout(() => {
            this.valueChanges();
        }, 0);
    }

    get formValue() {
        return this.form.value;
    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }

    shouldDisabledButton() {
        return this.formValue.lugar &&
            this.formValue.diaDe &&
            (this.formValue.horaDe && this.form.get('horaDe').valid) &&
            this.formValue.diaAte &&
            (this.formValue.horaAte && this.form.get('horaAte').valid) &&
            this.hourDeEhMenor();
    }

    hourDeEhMenor(): boolean {
        const hourDeDecimal = this.calendarioService.hourToDecimal(this.form.get('horaDe').value);
        const hourAteDecimal = this.calendarioService.hourToDecimal(this.form.get('horaAte').value);
        return hourDeDecimal <= hourAteDecimal;
    }

    preencherForm() {
        this.form.patchValue({
            lugar: this.consultorio.idConsultorio,
            diaDe: moment(this.bloqueio.dataInicio.dataInicio).toDate(),
            horaDe: moment(this.bloqueio.dataInicio.horaInicio).format('HH:mm'),
            diaAte: moment(this.bloqueio.dataFim.dataFim).toDate(),
            horaAte: moment(this.bloqueio.dataFim.horaFim).format('HH:mm'),
            observacao: this.bloqueio.observacao,
            status: this.bloqueio.ativo
        });
    }

    valueChanges() {
        this.form.get('diaDe').valueChanges.subscribe(val => {
            if (!val) {
                this.form.get('diaAte').disable();
            }
            this.datePicker.min = moment(val).toDate();
            this.form.get('diaAte').enable();
            this.form.get('diaAte').reset();
        });
    }

    async editar() {
        this.isLoading = true;
        const obj = {
            id: this.bloqueio.id,
            idMedico: this.medico.id,
            idConsultorio: this.formValue.lugar,
            dataInicio: `${moment(this.formValue.diaDe).format('YYYY-MM-DD')} ${this.formValue.horaDe}:00`,
            dataFim: `${moment(this.formValue.diaAte).format('YYYY-MM-DD')} ${this.formValue.horaAte}:00`,
            observacao: this.formValue.observacao,
            ativo: this.formValue.status
        };
        await this.recepcionistaService.alterarBloqueio(obj).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Bloqueio alterado com sucesso!',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
                this.dismiss(true);
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }
}
