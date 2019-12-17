import { Component, Input, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { SmartTableData } from '../../../@core/data/smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { StatusConsulta } from '../../../shared/interface';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { TOASTR } from '../../../shared/constants/toastr';

interface DiaConsulta {
  bloqueado: boolean;
  consulta: {
    codigoStatusConsulta: string;
    codigoTipoConsulta: string;
    dataStatusConsulta: string;
    ehEncaixe: boolean;
    id: number;
    nomePaciente: string;
  };
  dia: string;
  hora: string;
  observacaoBloqueio: string;
}

@Component({
  selector: 'ngx-alterar-status',
  templateUrl: 'alterar-status.component.html',
  styleUrls: ['alterar-status.component.scss']
})
export class AlterarStatusComponent implements OnInit {

  public isLoading: boolean;
  public valueInicial: number;

  public formasPagamento = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Cheque'
  ];

  public form = new FormGroup({
    status: new FormControl(null),
    motivo: new FormControl(null),
    valor: new FormControl(null),
    formaPagamento: new FormControl(null),
  });

  @Input() data: DiaConsulta;
  @Input() statusConsultas: StatusConsulta[];

  constructor(
    protected ref: NbDialogRef<AlterarStatusComponent>,
    private recepcionistaService: RecepcionistaService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.statusConsultas = this.statusConsultas.sort((a, b) => a.ordem - b.ordem);
    this.valueInicial = this.statusConsultas.filter(e => e.codigo === this.data.consulta.codigoStatusConsulta)[0].id;
    this.form.get('status').setValue(this.valueInicial);
  }

  dismiss() {
    this.ref.close(false);
  }

  async alterar() {
    this.isLoading = true;
    const data = {
      idStatusConsulta: this.form.get('status').value,
      idConsulta: this.data.consulta.id,
      valor: this.form.get('valor').value,
      formaPagamento: this.form.get('formaPagamento').value
    };
    if (this.form.get('status').value === 8) {
      data.valor = this.form.get('motivo').value;
    } else if (this.form.get('status').value === 9) {
      data.valor = String(this.form.get('valor').value);
    }
    await this.recepcionistaService.alterarStatus(data).then(response => {
      if (response.sucesso) {
        this.toastrService.show('', 'Status alterado com sucesso!',
          { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
        this.ref.close(true);
      } else {
        this.toastrService.show('', response.mensagens[0],
          { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  shouldDisabledButton() {
    return this.form.get('status').value === this.valueInicial ||
      (this.form.get('status').value === 8 && !this.form.get('motivo').value) ||
      (this.form.get('status').value === 9 && (this.form.get('valor').value < 0 || this.form.get('valor').value === '' || this.form.get('valor').value === null) ||
      (this.form.get('status').value === 9 && (!this.form.get('formaPagamento').value || this.form.get('valor').value < 0 || this.form.get('valor').value === '' || this.form.get('valor').value === null)));
  }

}
