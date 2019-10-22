import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecepcionistaService } from '../../../../shared/services/recepcionista.service';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../../shared/constants/toastr';

@Component({
    selector: 'ngx-adicionar-unidade-atendimento',
    templateUrl: 'adicionar-unidade-atendimento.component.html',
    styles: [`
        :host /deep/ nb-user div.user-container div.user-picture {
            background-position: center;
        }
    `]
})

export class AdicionarUnidadeAtendimentoComponent implements OnInit {
    form = new FormGroup({
        nome: new FormControl(''),
        telefone: new FormControl(''),
        cep: new FormControl(''),
        logradouro: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl('', [Validators.required]),
        status: new FormControl(true),
        urlFoto: new FormControl('')
    });

    public estados = [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' },
    ];

    public isLoading: boolean;
    public patternUrl = new RegExp(/^(ftp|https?):\/\/+(www\.)?/);

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<AdicionarUnidadeAtendimentoComponent>,
        private configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService) { }

    ngOnInit() {
    }

    dismiss(type: boolean): void {
        this.ref.close(type);
    }

    getImage() {
        return this.patternUrl.test(this.form.value.urlFoto) ? this.form.value.urlFoto : null;
    }

    isValid(control) {
        const valor = this.form.get(control).value;
        if ((this.form.get(control).valid && valor) && this.form.get(control).dirty) {
            return 'success';
        } else if ((this.form.get(control).valid && !valor) && this.form.get(control).dirty) {
            return 'danger';
        } else {
            return undefined;
        }
    }

    async adicionar(): Promise<void> {
        this.isLoading = true;
        const form = this.form.value;
        const obj = {
            nome: form.nome,
            urlFoto: form.urlFoto,
            cep: form.cep,
            logradouro: form.logradouro,
            numero: form.numero,
            complemento: form.complemento,
            bairro: form.bairro,
            cidade: form.cidade,
            estado: form.estado,
            telefone1: form.telefone,
            telefone2: null,
            celular1: null,
            celular2: null
        };
        await this.configuracoesService.adicionarConsultorio(obj).then(response => {
            if (response.sucesso) {
                this.toastrService.show('', 'Consultório adicionado com sucesso!',
                    { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
                this.dismiss(true);
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
}
