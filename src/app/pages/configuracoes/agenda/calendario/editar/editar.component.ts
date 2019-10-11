import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NbDialogRef, NbToastrService, NbDatepickerComponent } from '@nebular/theme';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { ListagemUsuario, Agenda, ListagemConsultoriosUsuario, Especialidades } from '../../../../../shared/interface';
import { ConfiguracoesService } from '../../../../../shared/services/configuracoes.service';
import { CalendarioService } from '../../../../../shared/services/calendarios.service';
import { TOASTR } from '../../../../../shared/constants/toastr';
import { RecepcionistaService } from '../../../../../shared/services/recepcionista.service';

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

export class EditarAgendaCalendarioComponent implements OnInit {
    public isLoading = false;
    public especialidades: Especialidades[];
    public consultorios: ListagemConsultoriosUsuario[];

    @Input() id: number;
    @Input() medico: ListagemUsuario;

    public agenda: Agenda;
    public form = new FormGroup({
        consultorio: new FormControl('', [Validators.required]),
        especialidade: new FormControl([], [Validators.required]),
        diaSemana: new FormControl('', [Validators.required]),
        inicioVigencia: new FormControl(''),
        fimVigencia: new FormControl(''),
        horaInicio: new FormControl(''),
        horaFim: new FormControl(''),
        encaixes: new FormControl(''),
        duracao: new FormControl('')
    }, { validators: this.validarForm() });
    public diasSemana = [
        { dia: 'Domingo', codigo: 0 },
        { dia: 'Segunda-feira', codigo: 1 },
        { dia: 'Terça-feira', codigo: 2 },
        { dia: 'Quarta-feira', codigo: 3 },
        { dia: 'Quinta-feira', codigo: 4 },
        { dia: 'Sexta-feira', codigo: 5 },
        { dia: 'Sábado', codigo: 6 },
    ];

    constructor(
        protected ref: NbDialogRef<EditarAgendaCalendarioComponent>,
        private configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService,
        private recepcionistaService: RecepcionistaService,
        private calendarioService: CalendarioService) { }

    async ngOnInit() {
        await this.obterDados();
        this.form.get('inicioVigencia').valueChanges.subscribe(val => {
            if (!val) {
                this.form.get('fimVigencia').disable();
            }
            this.form.get('fimVigencia').enable();
            this.form.get('fimVigencia').reset();
            this.datePicker.min = moment(val).toDate();
        });
    }

    @ViewChild('fimVigencia', { static: false }) datePicker: NbDatepickerComponent<any>;

    async obterDados() {
        this.isLoading = true;
        await Promise.all([this.obterEspecialidades(), this.obterConsultorios(), this.obterAgendaPorId()]);
        setTimeout(() => {
            this.preencherPasso();
        }, 0);
        this.isLoading = false;
    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }

    async obterEspecialidades() {
        await this.recepcionistaService.obterEspecialidades(this.medico.id).then(response => {
            if (response.sucesso) {
                this.especialidades = response.objeto;
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
                this.dismiss(false);
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            this.dismiss(false);
        });
    }

    async obterConsultorios() {
        await this.recepcionistaService.obterConsultorios(this.medico.id).then(response => {
            if (response.sucesso) {
                this.consultorios = response.resultado;
            } else {
                this.toastrService.show('', response.error,
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
                this.dismiss(false);
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            this.dismiss(false);
        });
    }

    validarForm() {
        const fn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
            const horaInicio = control.get('horaInicio').value;
            const horaFim = control.get('horaFim').value;
            const horaValida = moment(`2019-01-01T${horaFim}`).isSameOrAfter(`2019-01-01T${horaInicio}`);
            if (horaInicio.length === 5 && horaFim.length === 5 && !horaValida) {
                return { 'erroHora': 'A hora fim deve ser maior ou igual ao hora início' };
            } else {
                return null;
            }
        };
        return fn;
    }

    isValid(control: string) {
        if (this.form.get(control).valid && this.form.get(control).dirty) {
            return 'success';
        } else if (this.form.get(control).invalid && this.form.get(control).dirty) {
            return 'danger';
        } else {
            return undefined;
        }
    }

    async obterAgendaPorId() {
        this.isLoading = true;
        await this.configuracoesService.obterAgendaPorId(this.id).then(response => {
            if (response.sucesso) {
                this.agenda = response.objeto;
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
                this.dismiss(false);
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            this.dismiss(false);
        }).finally(() => {
            this.isLoading = false;
        });
    }

    get errorMessage() {
        if (this.form.errors) {
            return this.form.errors['erroHora'];
        } else {
            return '';
        }
    }

    showDisabledButton() {
        const form = this.form.value;
        return form.consultorio &&
            form.especialidade.length &&
            form.diaSemana !== '' &&
            form.inicioVigencia &&
            form.fimVigencia &&
            form.duracao &&
            form.encaixes &&
            (form.horaInicio && this.form.get('horaInicio').valid) &&
            (form.horaFim && this.form.get('horaFim').valid) &&
            this.hourDeEhMenor();
    }

    hourDeEhMenor(): boolean {
        const hourDeDecimal = this.calendarioService.hourToDecimal(this.form.get('horaInicio').value);
        const hourAteDecimal = this.calendarioService.hourToDecimal(this.form.get('horaFim').value);
        return hourDeDecimal <= hourAteDecimal;
    }

    preencherPasso() {
        this.form.patchValue({
            consultorio: this.agenda.idConsultorio,
            especialidade: this.agenda.usuariosConsultoriosEspecialidades.map(e => e.especialidade.id),
            diaSemana: this.agenda.diaSemana,
            inicioVigencia: moment(this.agenda.dataVigenciaInicio).toDate(),
            fimVigencia: moment(this.agenda.dataVigenciaFim).toDate(),
            horaInicio: this.agenda.horaInicio,
            horaFim: this.agenda.horaFim,
            encaixes: this.agenda.totalLimiteEncaixe,
            duracao: this.agenda.duracaoMinutos,
        });
        this.form.get('consultorio').markAsDirty();
        this.form.get('especialidade').markAsDirty();
        this.form.get('diaSemana').markAsDirty();
    }

    async editar() {
        this.isLoading = true;
        const form = this.form.value;
        const obj = {
            id: this.id,
            idMedico: this.medico.id,
            especialidades: form.especialidade,
            idConsultorio: form.consultorio,
            diaSemana: form.diaSemana,
            totalLimiteEncaixe: form.encaixes,
            horaInicio: form.horaInicio,
            horaFim: form.horaFim,
            duracaoMinutos: form.duracao,
            dataVigenciaInicio: form.inicioVigencia,
            dataVigenciaFim: form.fimVigencia
        };
        await this.configuracoesService.alterarAgenda(obj).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Agenda alterada com sucesso!',
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
