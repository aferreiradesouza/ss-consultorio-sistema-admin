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
    public menu = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
    ];
    public lista: any;

    constructor(
        public localStorage: LocalStorageService,
        public configuracoesService: ConfiguracoesService,
        public util: UtilService,
        private toastrService: NbToastrService) { }

    async ngOnInit() {
        await this.obterAnamnese();
        this.startCount();
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
        this.form = new FormGroup({});
        console.log(this.lista);
        this.lista.forEach(e => {
            e.children.forEach(f => {
                this.addControl(f.control);
            });
        });
    }

    addControl(control: string) {
        this.form.addControl(control, new FormControl(null));
    }

    startCount() {
        const dataAtual = moment();
        setInterval(() => {
            const tempo = moment.utc(moment(new Date()).diff(dataAtual)).format('HH:mm:ss');
            this.tempo = tempo;
        }, 1000);
    }
}
