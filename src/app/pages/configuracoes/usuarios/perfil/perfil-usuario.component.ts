import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { Usuario } from '../../../../shared/interface';

@Component({
    selector: 'ngx-perfil-usuario',
    templateUrl: 'perfil-usuario.component.html'
})

export class PerfilUsuarioComponent implements OnInit {
    public form = new FormGroup({
        nome: new FormControl({value: '', disabled: true}),
        email: new FormControl({value: '', disabled: true}),
        nomeAbreviado: new FormControl({value: '', disabled: true})
    });

    perfis = new FormControl({value: [], disabled: true});

    public isLoading: boolean;
    public teste = [];
    public user: Usuario;

    @Input() id: number;
    @Input() dados: any;

    constructor(
        protected ref: NbDialogRef<PerfilUsuarioComponent>,
        private configuracaoService: ConfiguracoesService) { }

    async ngOnInit() {
        this.isLoading = true;
        await this.configuracaoService.obterInfoUsuario(this.id).then(response => {
            if (response.sucesso) {
                this.user = response.objeto;
                this.preencherPasso(response.objeto);
            } else {
                this.dismiss({sucesso: false, mensagem: response.mensagens[0]});
            }
        }).catch(() => {
            this.dismiss({sucesso: false, mensagem: 'Algo de errado aconteceu, tente novamente mais tarde!'});
        });
        this.isLoading = false;
    }

    dismiss(status: {sucesso: boolean, mensagem: string}) {
        this.ref.close(status);
    }

    editar() {
        this.ref.close(true);
    }

    preencherPasso(user: Usuario) {
        this.form.patchValue({
            nome: user.nome,
            email: user.email,
            nomeAbreviado: user.nome
        });
        this.perfis.setValue(['adminsitracao', 'estoque']);
    }
}
