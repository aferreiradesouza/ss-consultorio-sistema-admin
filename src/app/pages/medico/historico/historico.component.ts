import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { PacientesService } from '../../../shared/services/pacientes.service';
import { TOASTR } from '../../../shared/constants/toastr';
import { Anamnese, ConsultasTemplatesDocumentos, Paciente } from '../../../shared/interface';
import { UtilService } from '../../../shared/services/util.service';
@Component({
  selector: 'ngx-historico-paciente',
  templateUrl: 'historico.component.html'
})
export class HistoricoPacienteComponent implements OnInit {

  @Input() id: number;

  public isLoading = false;
  public paciente: Paciente;

  constructor(
    protected ref: NbDialogRef<HistoricoPacienteComponent>,
    private pacienteService: PacientesService,
    private toastrService: NbToastrService,
    private utilService: UtilService) { }

  async ngOnInit() {
    await this.obterPaciente();
  }

  async obterPaciente() {
    this.isLoading = true;
    await this.pacienteService.obterInfoPaciente(this.id).then(response => {
      if (response.sucesso) {
        this.paciente = this.getConsultasFiltrado(response.objeto);
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

  dismiss() {
    this.ref.close(false);
  }

  getConsultasFiltrado(user: Paciente) {
    const usuario: Paciente = this.utilService.clone(user);
    usuario.consultas = usuario.consultas.filter(e => e.codigoStatusConsulta === 'atendimento_finalizado');
    return usuario;
  }
}
