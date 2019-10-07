import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { Consultorio } from '../../../../shared/interface';
import { TOASTR } from '../../../../shared/constants/toastr';

@Component({
    selector: 'ngx-editar-unidade-atendimento',
    templateUrl: 'editar-unidade-atendimento.component.html',
})

export class EditarUnidadeAtendimentoComponent implements OnInit {
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
        status: new FormControl(false)
    });

    public isLoading: boolean;
    public consultorio: Consultorio;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarUnidadeAtendimentoComponent>,
        private configuracoesService: ConfiguracoesService,
        private toastrService: NbToastrService) { }

    async ngOnInit() {
        await this.obterConsultorio();
    }

    async obterConsultorio(): Promise<void> {
        this.isLoading = true;
        await this.configuracoesService.obterConsultorioPorId(this.id).then(response => {
            if (response.sucesso) {
                this.consultorio = response.objeto;
                this.preencherForm();
            } else {
                this.toastrService.show('', response.mensagens[0],
                    { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
                this.dismiss();
            }
        }).catch(err => {
            this.toastrService.show('', TOASTR.msgErroPadrao,
                { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
            this.dismiss();
        }).finally(() => {
            this.isLoading = false;
        });
    }

    dismiss() {
        this.ref.close(false);
    }

    editar() {
        this.ref.close(true);
    }

    preencherForm() {
        this.form.patchValue({
            nome: this.consultorio.nome,
            telefone: this.consultorio.telefone1,
            cep: this.consultorio.cep,
            logradouro: this.consultorio.logradouro,
            numero: this.consultorio.numero,
            complemento: this.consultorio.complemento,
            bairro: this.consultorio.bairro,
            cidade: this.consultorio.cidade,
            estado: this.consultorio.estado,
            status: this.consultorio.ativo,
            urlFoto: this.consultorio.urlFoto
        });
    }

    // enviar() {
    //     const form = this.form.value;
    //     const obj = {

    //     }
    // }
}
