import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../../shared/constants/toastr';

@Component({
    selector: 'ngx-adicionar-usuario',
    templateUrl: 'adicionar-usuario.component.html'
})

export class AdicionarUsuarioComponent implements OnInit {
    public form = new FormGroup({
        nome: new FormControl(''),
        email: new FormControl(''),
        telefone: new FormControl(''),
        celular: new FormControl(''),
        nascimento: new FormControl(''),
        urlFoto: new FormControl(''),
        cpf: new FormControl(''),
        idade: new FormControl({ value: '', disabled: true }),
        crm: new FormControl(''),
        senha: new FormControl(''),
        confSenha: new FormControl(''),
        status: new FormControl(true)
    });

    perfis = new FormControl([]);

    public isLoading: boolean;
    public patternUrl = new RegExp(/^(ftp|https?):\/\/+(www\.)?/);

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<AdicionarUsuarioComponent>,
        private configuracoesService: ConfiguracoesService) { }

    ngOnInit() {
        this.form.get('nascimento').valueChanges.subscribe(val => {
            if (val.length === 10) {
                setTimeout(() => {
                    const hoje = moment();
                    const dataNascimento = moment(this.form.value.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
                    const idade = hoje.diff(dataNascimento, 'years', false);
                    this.form.get('idade').setValue(idade);
                }, 0);
            }
        });
    }

    dismiss(data: { sucesso: boolean, mensagem: string }) {
        this.ref.close(data);
    }

    getImage() {
        return this.patternUrl.test(this.form.value.urlFoto) ? this.form.value.urlFoto : null;
    }

    async adicionar() {
        this.isLoading = true;
        const form = this.form.value;
        const dados = {
            nome: form.nome || null,
            cpf: form.cpf ? form.cpf.replace(new RegExp(/[.\-]/, 'g'), '') : null,
            ehMedico: this.perfis.value.indexOf('medico') > -1,
            ehFinanceiro: this.perfis.value.indexOf('financeiro') > -1,
            ehRecepcionista: this.perfis.value.indexOf('recepcionista') > -1,
            crm: form.crm || null,
            celular: form.celular || null,
            telefone: form.telefone || null,
            email: form.email || null,
            urlFoto: form.urlFoto || null,
            ehAdministrador: this.perfis.value.indexOf('administracao') > -1,
            dataNascimento: form.nascimento ? moment(form.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD') : null,
            ativo: form.status,
            senha: form.senha
        };

        await this.configuracoesService.adicionarUsuario(dados).then(response => {
            if (response.sucesso) {
                this.dismiss({ sucesso: true, mensagem: 'Usuário alterado com sucesso!' });
            } else {
                this.dismiss({ sucesso: false, mensagem: response.mensagens[0] });
            }
        }).catch(err => {
            this.dismiss({ sucesso: false, mensagem: TOASTR.msgErroPadrao });
        });
        this.isLoading = false;
    }

    showErrorSelect() {
        const control = this.perfis;
        if (!control.valid) {
            if (control.touched && control.dirty) {
                return 'danger';
            } else {
                return undefined;
            }
        } else {
            if (control.touched && control.dirty) {
                return 'success';
            } else {
                return undefined;
            }
        }
    }

    disabledButton() {
        return (this.form.valid && this.perfis.valid) && (this.form.value.senha === this.form.value.confSenha);
    }
}
