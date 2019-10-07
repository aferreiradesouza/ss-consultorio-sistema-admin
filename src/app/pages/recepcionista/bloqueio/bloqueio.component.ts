import { Component, Input, OnInit, AfterViewInit, AfterViewChecked, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService, NbDatepickerComponent } from '@nebular/theme';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';
import { ListagemConsultoriosUsuario, ListagemUsuario } from '../../../shared/interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { TOASTR } from '../../../shared/constants/toastr';

@Component({
  selector: 'ngx-bloqueio',
  templateUrl: 'bloqueio.component.html',
  styleUrls: ['bloqueio.component.scss']
})
export class BloqueioComponent implements OnInit {

  public isLoading: boolean;
  public listagemConsultorios: ListagemConsultoriosUsuario[];

  public form = new FormGroup({
    medico: new FormControl(null, [Validators.required]),
    lugar: new FormControl({ value: null, disabled: true }, [Validators.required]),
    diaDe: new FormControl('', [Validators.required]),
    horaDe: new FormControl(''),
    diaAte: new FormControl({ value: '', disabled: true }, [Validators.required]),
    horaAte: new FormControl(''),
    observacao: new FormControl('')
  });

  @Input() dados: any;
  @Input() listaMedicos: ListagemUsuario[];
  @Input() listaConsultorios: ListagemConsultoriosUsuario[];
  @Input() medico: number;
  @Input() lugar: number;

  @ViewChild('ate', { static: false }) datePicker: NbDatepickerComponent<any>;

  constructor(
    protected ref: NbDialogRef<BloqueioComponent>,
    private recepcionistaService: RecepcionistaService,
    private toastrService: NbToastrService,
    private calendarioService: CalendarioService) { }

  ngOnInit() {
    this.preencherFormulário();
    this.form.get('diaDe').valueChanges.subscribe(val => {
      if (!val) {
        this.form.get('diaAte').disable();
      }
      this.datePicker.min = moment(val).toDate();
      this.form.get('diaAte').enable();
    });
  }

  preencherFormulário() {
    this.form.get('medico').setValue(this.medico);
    this.listagemConsultorios = this.listaConsultorios;
    this.form.get('lugar').setValue(this.lugar);
    this.form.get('lugar').enable();
  }

  get formValue() {
    return this.form.value;
  }

  dismiss() {
    this.ref.close(false);
  }

  bloqueio() {
    this.ref.close(true);
  }

  async obterConsultorios(id: number) {
    this.form.get('lugar').setValue(null);
    this.isLoading = true;
    await this.recepcionistaService.obterConsultorios(id).then(response => {
      if (response.sucesso) {
        if (!response.resultado.length) {
          this.toastrService.show('', 'O Médico não tem nenhum consultório, escolha outro médico.',
            { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
          return;
        }
        this.form.get('lugar').enable();
        this.listagemConsultorios = response.resultado;
      } else {
        this.toastrService.show('', response.error,
          { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
      }
    }).catch(err => {
      this.toastrService.show('', TOASTR.msgErroPadrao,
        { status: 'danger', duration: TOASTR.timer, position: TOASTR.position });
    }).finally(() => {
      this.isLoading = false;
    });
  }

  shouldDisabledButton() {
    return this.formValue.medico &&
      this.formValue.lugar &&
      this.formValue.diaDe &&
      (this.formValue.horaDe && this.form.get('horaDe').valid) &&
      this.formValue.diaAte &&
      (this.formValue.horaAte && this.form.get('horaAte').valid) &&
      this.hourDeEhMenor();
  }

  hourDeEhMenor(): boolean {
    const hourDeDecimal = this.calendarioService.hourToDecimal(this.form.get('horaDe').value);
    const hourAteDecimal = this.calendarioService.hourToDecimal(this.form.get('horaAte').value);
    return hourDeDecimal <= hourAteDecimal;
  }

  async criarBloqueio() {
    this.isLoading = true;
    const obj = {
      idMedico: this.formValue.medico,
      idConsultorio: this.formValue.lugar,
      dataInicio: `${moment(this.formValue.diaDe).format('YYYY-MM-DD')} ${this.formValue.horaDe}:00`,
      dataFim: `${moment(this.formValue.diaAte).format('YYYY-MM-DD')} ${this.formValue.horaAte}:00`,
      observacao: this.formValue.observacao
    };
    await this.recepcionistaService.criarBloqueio(obj).then(response => {
      if (response.sucesso) {
        this.toastrService.show('', 'Bloqueio criado com sucesso!',
          { status: 'success', duration: TOASTR.timer, position: TOASTR.position });
        this.bloqueio();
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
