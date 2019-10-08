import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ConfiguracoesService } from '../../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../../shared/constants/toastr';

@Component({
  selector: 'ngx-deletar-usuario',
  templateUrl: 'deletar.component.html',
})
export class DeletarUnidadeAtendimentoComponent implements OnInit {

  public isLoading: boolean;

  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<DeletarUnidadeAtendimentoComponent>,
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
    await this.configuracoesService.deletarConsultorio(this.id).then(async response => {
      if (response.sucesso) {
        this.toastrService.show('', 'Consultório excluído com sucesso!',
            { status: 'success', duration: TOASTR.timer, position: <any>TOASTR.position });
        this.dismiss(true);
      } else {
        this.toastrService.show('', response.mensagens[0],
            { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
        this.dismiss(false);
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
          { status: 'danger', duration: TOASTR.timer, position: <any>TOASTR.position });
      this.dismiss(false);
    }).finally(() => {
      this.isLoading = false;
    });
  }
}
