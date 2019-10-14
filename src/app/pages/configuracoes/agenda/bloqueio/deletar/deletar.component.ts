import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ConfiguracoesService } from '../../../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../../../shared/constants/toastr';

@Component({
  selector: 'ngx-deletar-bloqueio',
  templateUrl: 'deletar.component.html'
})
export class DeletarBloqueioComponent implements OnInit {
  public isLoading: boolean;

  @Input() id: number;

  constructor(
    protected ref: NbDialogRef<DeletarBloqueioComponent>,
    private configuracoesService: ConfiguracoesService,
    private toastrService: NbToastrService
    ) { }

  async ngOnInit() {
  }

  dismiss(type: boolean) {
    this.ref.close(type);
  }

  async deletar() {
    this.isLoading = true;
    await this.configuracoesService.deletarBloqueio(this.id).then(response => {
      if (response.sucesso) {
        this.toastrService.show('', 'Bloqueio excluído com sucesso!',
          { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
          this.dismiss(true);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoading = false;
    });
  }
}
