import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ConfiguracoesService } from '../../../../../shared/services/configuracoes.service';
import { TOASTR } from '../../../../../shared/constants/toastr';

@Component({
  selector: 'ngx-deletar-agenda-calendario',
  templateUrl: 'deletar.component.html'
})
export class DeletarAgendaCalendarioComponent implements OnInit {
  public isLoading: boolean;

  @Input() id: number;
  @Input() dados: any;

  constructor(
    protected ref: NbDialogRef<DeletarAgendaCalendarioComponent>,
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
    await this.configuracoesService.deletarAgenda(this.id).then(response => {
      if (response.sucesso) {
        this.toastrService.show('', 'Agenda excluída com sucesso!',
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
