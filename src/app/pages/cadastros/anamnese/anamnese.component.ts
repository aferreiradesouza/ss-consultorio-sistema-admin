import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NbDialogRef, NbToastrService, NbDatepickerComponent } from '@nebular/theme';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ANAMNESE } from '../../../shared/constants/anamnese';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { Especialidades, ListagemUsuario, Usuario, Anamnese } from '../../../shared/interface';
import { TOASTR } from '../../../shared/constants/toastr';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';

@Component({
    selector: 'ngx-anamnese',
    templateUrl: 'anamnese.component.html',
    styleUrls: [`anamnese.component.scss`]
})

export class AnamneseComponent implements OnInit {

    public listaAnamnese = ANAMNESE;
    public form: FormGroup;
    public isLoading: boolean;
    public especialidades: Especialidades[] = [];
    public medicos: ListagemUsuario[];
    public medicosFiltrado: ListagemUsuario[];
    public step: 1 | 2 = 1;
    public search: string;
    public medicoSelecionado: Usuario;
    public isLoadingAnamnese: boolean;
    public existeAnamnese: boolean;
    public anamnese: Anamnese;

    constructor(
        public configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService,
        private recepcionistaService: RecepcionistaService) { }

    async ngOnInit() {
        await this.obterMedico();
    }

    initializeForm() {
        this.form = new FormGroup({});
        console.log(ANAMNESE);
        this.listaAnamnese.forEach(e => {
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

    async obterMedico(): Promise<any> {
        this.isLoading = true;
        await this.recepcionistaService.obterMedicos().then(response => {
            if (response.sucesso) {
                this.medicos = response.resultado;
                this.medicosFiltrado = this.medicos;
            } else {
                this.toastrService.show('', response.error,
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
                this.medicos = [];
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            this.medicos = [];
        }).finally(() => {
            this.isLoading = false;
        });
    }

    filtrarMedico(nome: string) {
        if (!nome) {
            this.medicosFiltrado = this.medicos;
            return;
        }
        this.medicosFiltrado = this.medicos.filter(e => e.nome.toLocaleLowerCase().includes(nome.toLocaleLowerCase()));
    }

    setStep(num: 1 | 2) {
        this.step = num;
        if (num === 1) {
            this.form.reset();
        }
    }

    async selecionarMedico(medico: Usuario) {
        this.setStep(2);
        this.medicoSelecionado = medico;
        this.initializeForm();
        await this.obterListagemAnamnese();
    }

    async obterListagemAnamnese(): Promise<void> {
        this.isLoading = true;
        await this.configuracoesService.obterAnamnese(this.medicoSelecionado.id).then(async resp => {
            if (resp.sucesso) {
                if (resp.objeto) {
                    this.anamnese = resp.objeto;
                    await this.preencherLista(resp.objeto);
                    this.existeAnamnese = true;
                } else {
                    this.anamnese = null;
                    this.existeAnamnese = false;
                }
            } else {
                this.toastrService.show('', resp.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(() => {
            this.isLoading = false;
        });
    }

    async preencherLista(obj: Anamnese): Promise<void> {
        const arr = Object.keys(obj);
        this.listaAnamnese.forEach(e => {
            e.children.forEach(c => {
                if (arr.indexOf(c.control) > -1) {
                    this.form.get(c.control).setValue(obj[c.control]);
                }
            });
        });
    }

    async criarAlterarAnamnese() {
        const obj = {
            ...this.form.value,
            idMedico: this.medicoSelecionado.id,
            id: this.anamnese ? this.anamnese.id : 0
        };
        this.existeAnamnese ? await this.alterarAnamnese(obj) : await this.criarAnamnese(obj);
    }

    async criarAnamnese(data) {
        this.isLoading = true;
        await this.configuracoesService.criarAnamnese(data).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Anamnese alterado com sucesso!',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
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

    async alterarAnamnese(data) {
        this.isLoading = true;
        await this.configuracoesService.alterarAnamnese(data).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Anamnese alterado com sucesso!',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
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
