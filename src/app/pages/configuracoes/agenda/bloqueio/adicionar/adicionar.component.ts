import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbToastrService, NbDatepickerComponent } from '@nebular/theme';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { ListagemUsuario, Especialidades, ListagemConsultoriosUsuario } from '../../../../../shared/interface';
import { RecepcionistaService } from '../../../../../shared/services/recepcionista.service';
import { TOASTR } from '../../../../../shared/constants/toastr';
import { ConfiguracoesService } from '../../../../../shared/services/configuracoes.service';
import { CalendarioService } from '../../../../../shared/services/calendarios.service';

@Component({
    selector: 'ngx-adicionar-bloqueio',
    templateUrl: 'adicionar.component.html',
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

export class AdicionarBloqueioComponent implements OnInit {
    public isLoading: boolean;

    public form = new FormGroup({
        lugar: new FormControl('', [Validators.required]),
        diaDe: new FormControl('', [Validators.required]),
        horaDe: new FormControl(''),
        diaAte: new FormControl({ value: '', disabled: true }, [Validators.required]),
        horaAte: new FormControl(''),
        observacao: new FormControl('')
    });

    @Input() medico: ListagemUsuario;
    @Input() listagemConsultorios: ListagemConsultoriosUsuario[];

    @ViewChild('ate', { static: false }) datePicker: NbDatepickerComponent<any>;

    constructor(
        protected ref: NbDialogRef<AdicionarBloqueioComponent>,
        private toastrService: NbToastrService,
        private recepcionistaService: RecepcionistaService,
        private calendarioService: CalendarioService) { }

    async ngOnInit() {
        this.form.get('diaDe').valueChanges.subscribe(val => {
            if (!val) {
                this.form.get('diaAte').disable();
            }
            this.datePicker.min = moment(val).toDate();
            this.form.get('diaAte').enable();
            this.form.get('diaAte').reset();
        });
    }

    get formValue() {
        return this.form.value;
    }

    dismiss() {
        this.ref.close(false);
    }

    bloqueio() {
        this.ref.close(true);
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

    async criarBloqueio() {
        this.isLoading = true;
        const obj = {
            idMedico: this.medico.id,
            idConsultorio: this.formValue.lugar,
            dataInicio: `${moment(this.formValue.diaDe).format('YYYY-MM-DD')} ${this.formValue.horaDe}:00`,
            dataFim: `${moment(this.formValue.diaAte).format('YYYY-MM-DD')} ${this.formValue.horaAte}:00`,
            observacao: this.formValue.observacao
        };
        await this.recepcionistaService.criarBloqueio(obj).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Bloqueio criado com sucesso!',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
                this.bloqueio();
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
