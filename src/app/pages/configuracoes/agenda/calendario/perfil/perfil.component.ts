import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfiguracoesService } from '../../../../../shared/services/configuracoes.service';
import { error } from '@angular/compiler/src/util';
import { TOASTR } from '../../../../../shared/constants/toastr';
import { Agenda, ListagemUsuario } from '../../../../../shared/interface';
import { CalendarioService } from '../../../../../shared/services/calendarios.service';

@Component({
    selector: 'ngx-perfil-agenda-calendario',
    templateUrl: 'perfil.component.html',
    styles: [`
    :host /deep/ nb-user div.user-container div.user-picture {
        background-position: center;
    }
    `]
})

export class PerfilAgendaCalendarioComponent implements OnInit {
    public isLoading = false;
    public form = new FormGroup({
        consultorio: new FormControl({ value: null, disabled: true }),
        especialidade: new FormControl({ value: null, disabled: true }),
        diaSemana: new FormControl({ value: null, disabled: true }),
        inicioVigencia: new FormControl({ value: null, disabled: true }),
        fimVigencia: new FormControl({ value: null, disabled: true }),
        horaInicio: new FormControl({ value: null, disabled: true }),
        horaFim: new FormControl({ value: null, disabled: true }),
        encaixes: new FormControl({ value: null, disabled: true }),
        duracao: new FormControl({ value: null, disabled: true })
    });

    @Input() id: number;
    @Input() medico: ListagemUsuario;

    public agenda: Agenda;

    constructor(
        protected ref: NbDialogRef<PerfilAgendaCalendarioComponent>,
        private configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService,
        private calendarioService: CalendarioService) { }

    async ngOnInit() {
        await this.obterAgendaPorId();
    }

    dismiss(type: boolean) {
        this.ref.close(type);
    }

    async obterAgendaPorId() {
        this.isLoading = true;
        await this.configuracoesService.obterAgendaPorId(this.id).then(response => {
            if (response.sucesso) {
                this.agenda = response.objeto;
                this.preencherPasso();
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
                this.dismiss(false);
            }
        }).catch(err => {
            console.log(err);
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            this.dismiss(false);
        }).finally(() => {
            this.isLoading = false;
        });
    }

    preencherPasso() {
        this.form.patchValue({
            consultorio: this.agenda.consultorio.nome,
            especialidade: this.agenda.usuariosConsultoriosEspecialidades[0].especialidade.nome,
            diaSemana: this.calendarioService.formatarDay(this.agenda.diaSemana).extenso,
            inicioVigencia: this.agenda.dataVigenciaInicio,
            fimVigencia: this.agenda.dataVigenciaFim,
            horaInicio: this.agenda.horaInicio,
            horaFim: this.agenda.horaFim,
            encaixes: this.agenda.totalLimiteEncaixe,
            duracao: this.agenda.duracaoMinutos,
        });
    }
}
