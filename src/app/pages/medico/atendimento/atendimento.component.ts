import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ConfiguracoesService } from '../../../shared/services/configuracoes.service';
import { UtilService } from '../../../shared/services/util.service';
import { Anamnese } from '../../../shared/interface';
import { NbToastrService } from '@nebular/theme';
import { TOASTR } from '../../../shared/constants/toastr';

@Component({
    selector: 'ngx-atendimento',
    templateUrl: 'atendimento.component.html',
    styleUrls: ['atendimento.component.scss']
})

export class AtendimentoComponent implements OnInit {
    public isLoading = false;
    public tempo = '00:00:00';
    public menu = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
    ];
    public anamnese: Anamnese;

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
                this.anamnese = response.objeto;
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

    startCount() {
        const dataAtual = moment();
        setInterval(() => {
            const tempo = moment.utc(moment(new Date()).diff(dataAtual)).format('HH:mm:ss');
            this.tempo = tempo;
        }, 1000);
    }
}
