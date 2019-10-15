import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ListagemUsuario, ListagemConsultoriosUsuario } from '../../../../../shared/interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    public consultorio: ListagemConsultoriosUsuario;

    public form = new FormGroup({
        lugar: new FormControl({value: '', disabled: true}),
        diaDe: new FormControl({value: '', disabled: true}),
        horaDe: new FormControl({value: '', disabled: true}),
        diaAte: new FormControl({value: '', disabled: true}),
        horaAte: new FormControl({value: '', disabled: true}),
        observacao: new FormControl({value: '', disabled: true}),
        status: new FormControl({value: false, disabled: true})
    });

    @Input() id: number;
    @Input() medico: ListagemUsuario;
    @Input() listagemConsultorios: ListagemConsultoriosUsuario[];
    @Input() bloqueio: Bloqueio;

    constructor(
        protected ref: NbDialogRef<PerfilBloqueioComponent>) { }

    async ngOnInit() {
        this.consultorio = this.listagemConsultorios.filter(e => e.idConsultorio === this.bloqueio.consultorio.idConsultorio)[0];
        this.preencherForm();
    }

    dismiss(type: boolean) {
        this.ref.close(type);
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
}
