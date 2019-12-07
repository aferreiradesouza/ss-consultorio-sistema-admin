import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { UtilService } from '../../../shared/services/util.service';
import { Anamnese } from '../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../shared/constants/toastr';
import { ANAMNESE } from '../../../shared/constants/anamnese';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'ngx-atendimento',
    templateUrl: 'atendimento.component.html',
    styleUrls: ['atendimento.component.scss']
})

export class AtendimentoComponent implements OnInit {
    public isLoading = false;
    public tempo = '00:00:00';
    public form: FormGroup;
    public formDisabled = true;
    public tabActive = 'anamnese';
    public disabledIniciarAtendimento = false;
    public menu = [
        {label: 'Anamnese', value: 'anamnese'},
        {label: 'Prescrição', value: 'prescricao'},
        {label: 'Pedidos de exames', value: 'pedidosExames'},
        {label: 'Laudos de exames', value: 'laudoExames'},
        {label: 'Atestados', value: 'atestado'},
        {label: 'Imagens e documentos', value: 'imgDoc'},
    ];
    public lista: any;

    constructor(
        public localStorage: LocalStorageService,
        public configuracoesService: ConfiguracoesService,
        public util: UtilService,
        private toastrService: NbToastrService) { }

    async ngOnInit() {
        await this.obterAnamnese();
    }

    async obterAnamnese() {
        const idMedico = this.localStorage.getJson('login').id;
        this.isLoading = true;
        await this.configuracoesService.obterAnamnese(idMedico).then(response => {
            if (response.sucesso) {
                let _anamnese = Object.keys(response.objeto);
                _anamnese = _anamnese.filter(element => {
                    return response.objeto[element];
                });
                const arr = ANAMNESE;
                this.lista = [];
                arr.forEach(f => {
                    const filhos = [];
                    f.children.forEach(c => {
                        if (_anamnese.indexOf(c.control) > -1) {
                            filhos.push(c);
                        }
                    });
                    if (filhos.length) {
                        const novoObj = {
                            title: f.title,
                            children: filhos
                        };
                        this.lista.push(novoObj);
                    }
                });
                this.initializeForm();
            } else {
                this.toastrService.show('', response.mensagens[0],
                  { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
              { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
        }).finally(async () => {
            await this.util.loading(400, () => this.isLoading = false);
        });
    }

    initializeForm() {
        this.form = new FormGroup({
            prescricao: new FormControl(null)
        });
        this.lista.forEach(e => {
            e.children.forEach(f => {
                this.addControl(f.control);
            });
        });
    }

    addControl(control: string) {
        this.form.addControl(control, new FormControl({value: null, disabled: true}));
    }

    startCount() {
        const dataAtual = moment();
        setInterval(() => {
            const tempo = moment.utc(moment(new Date()).diff(dataAtual)).format('HH:mm:ss');
            this.tempo = tempo;
        }, 1000);
    }

    habilitarFormulario() {
        this.form.enable();
        this.formDisabled = false;
    }

    iniciarAtendimento() {
        this.startCount();
        this.habilitarFormulario();
        this.disabledIniciarAtendimento = true;
    }

    setTabActive(tab: string) {
        this.tabActive = tab;
    }
}
