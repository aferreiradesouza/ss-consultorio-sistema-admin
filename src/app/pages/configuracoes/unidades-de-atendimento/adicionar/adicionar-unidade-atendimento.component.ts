import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { RecepcionistaService } from '../../../../shared/services/recepcionista.service';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../../shared/constants/toastr';

@Component({
    selector: 'ngx-adicionar-unidade-atendimento',
    templateUrl: 'adicionar-unidade-atendimento.component.html'
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
        estado: new FormControl(''),
        status: new FormControl(true),
        urlFoto: new FormControl('')
    });
    public isLoading: boolean;

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
