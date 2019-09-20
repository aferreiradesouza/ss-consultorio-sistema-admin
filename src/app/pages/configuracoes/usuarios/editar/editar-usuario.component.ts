import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { Usuario } from '../../../../shared/interface';

@Component({
    selector: 'ngx-editar-usuario',
    templateUrl: 'editar-usuario.component.html',
})

export class EditarUsuarioComponent implements OnInit {
    public form = new FormGroup({
        nome: new FormControl(''),
        email: new FormControl(''),
        nomeAbreviado: new FormControl(''),
        status: new FormControl(false)
    });

    public user: Usuario;
    perfis = new FormControl([], [Validators.required]);

    public isLoading: boolean;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<EditarUsuarioComponent>,
        private configuracoesService: ConfiguracoesService) { }

    async ngOnInit() {
        this.isLoading = true;
        await this.configuracoesService.obterInfoUsuario(this.id).then(response => {
            if (response.sucesso) {
                this.user = response.objeto;
                this.preencherPasso(this.user);
            } else {
                this.dismiss({sucesso: false, mensagem: response.mensagens[0]});
            }
        }).catch(err => {
            this.dismiss({sucesso: false, mensagem: 'Não foi pissível obter os dados do usuário. Tente novamente mais tarde!'});
        });
        this.isLoading = false;
    }

    dismiss(status: {sucesso: boolean, mensagem: string}) {
        this.ref.close(status);
    }

    async editar() {
        this.isLoading = true;
        const dados: Usuario = this.dados;
        dados.nome = this.form.value.nome;
        dados.email = this.form.value.email;
        dados.ativo = this.form.value.status;

        await this.configuracoesService.alterarUsuario(dados).then(respose => {
            if (respose.sucesso) {
                this.dismiss({sucesso: true, mensagem: 'Usuário alterado com sucesso!'});
            } else {
                this.dismiss({sucesso: false, mensagem: respose.mensagens[0]});
            }
        }).catch(err => {
            this.dismiss({sucesso: false, mensagem: 'Não foi possível realizar a alteração, tente novamente mais tarde!'});
        });
        this.isLoading = false;
    }

    preencherPasso(user: Usuario) {
        this.form.patchValue({
            nome: user.nome,
            email: user.email,
            nomeAbreviado: user.nome,
            status: user.ativo
        });
        this.perfis.setValue(['adminsitracao', 'estoque']);
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
            return 'success';
        }
    }
}
