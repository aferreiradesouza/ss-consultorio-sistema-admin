import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { TOASTR } from '../../../shared/constants/toastr';
import { Anamnese, ConsultasTemplatesDocumentos, Paciente } from '../../../shared/interface';
@Component({
  selector: 'ngx-historico-paciente',
  templateUrl: 'historico.component.html'
})
export class HistoricoPacienteComponent implements OnInit {

  @Input() id: number;

  public data = [1, 2, 3, 4, 5, 6];
  public isLoading = false;
  public consulta: Paciente;

  constructor(
    protected ref: NbDialogRef<HistoricoPacienteComponent>,
    private pacienteService: PacientesService,
    private toastrService: NbToastrService) { }

  async ngOnInit() {
    await this.obterPaciente();
  }

  async obterPaciente() {
    this.isLoading = true;
    await this.pacienteService.obterInfoPaciente(this.id).then(response => {
      if (response.sucesso) {
        this.consulta = response.objeto;
        console.log(this.consulta);
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
