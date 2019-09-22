import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import * as moment from 'moment';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';

@Component({
  selector: 'ngx-deletar-usuario',
  templateUrl: 'deletar.component.html',
})
export class DeletarUsuarioComponent implements OnInit {

  public isLoading: boolean;

  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<DeletarUsuarioComponent>,
    private configuracoesService: ConfiguracoesService
    ) { }

  async ngOnInit() {
  }

  dismiss(data: {sucesso: boolean, mensagem: string}) {
    this.ref.close(data);
  }

  async deletar() {
    this.isLoading = true;
    await this.configuracoesService.deletarUsuario(this.id).then(async response => {
      if (response.sucesso) {
        this.dismiss({sucesso: true, mensagem: 'Usuário excluído com sucesso!'});
      } else {
        this.dismiss({sucesso: false, mensagem: response.mensagens[0]});
      }
    }).catch(err => {
      this.dismiss({sucesso: false, mensagem: 'Sistema indisponível no momento, tente novamente mais tarde!'});
    });
    this.isLoading = false;
  }
}
