import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NbCalendarRange, NbIconLibraries, NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { CalendarioComponent } from '../../../shared/components';
import { CalendarioData } from '../../../@core/data/calendario';
import { CalendarioDoDiaComponent } from '../../../shared/components/calendario-do-dia/calendario-do-dia.component';
import { LegendasComponent } from '../legendas/legendas.component';
import { AgendarConsultaComponent } from '../agendar-consulta/agendar-consulta.component';
import { AlterarStatusComponent } from '../alterar-status/alterar-status.component';
import { DetalhesConsultaComponent } from '../detalhes-consulta/detalhes-consulta.component';
import { CalendarCustomDayCellComponent } from './day-cell.component';
import { RecepcionistaService } from '../../../shared/services/recepcionista.service';

@Component({
  selector: 'ngx-calendario-recepcionista',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
  entryComponents: [CalendarCustomDayCellComponent]
})
export class CalendarioRecepcaoComponent implements OnInit, AfterViewInit {

  public data: any[];
  public date = new Date();
  public isOpen = true;
  public range: NbCalendarRange<Date>;
  public isLoading = false;
  public visao = '2';
  public medico = 1;
  public lugar = 1;
  public especialidade = '1';
  public dataEvent: any = moment('2019-09-18').toDate();
  public filter: any;
  public dayCellComponent = CalendarCustomDayCellComponent;
  public group: any[];

  @ViewChild(CalendarioComponent, { static: false }) calendario: CalendarioComponent;
  @ViewChild(CalendarioDoDiaComponent, { static: false }) calendarioDoDia: CalendarioDoDiaComponent;

  constructor(iconsLibrary: NbIconLibraries,
    public calendarioService: CalendarioService,
    public calendarioMock: CalendarioData,
    private dialogService: NbDialogService,
    private recepcionistaService: RecepcionistaService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  async ngOnInit() {
    this.isLoading = true;
    const data = {
      idMedico: this.medico,
      idConsultorio: this.lugar,
      dataInicial: `${moment().year()}-01-01`,
      dataFinal: `${moment().year()}-12-31`,
    };
    await this.recepcionistaService.obterConsultas(data).then(response => {
      this.data = response.objeto;
      this.filter = (date) => {
        return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(date).format('YYYY-MM-DD')) > -1;
      };
      this.obterIndexData();
      this.isLoading = false;
      this.obterGrupoHoje();
    });
  }

  ngAfterViewInit() {
  }

  changeDia(event) {
    this.dataEvent = moment(event).format('YYYY-MM-DD');
    this.obterGrupoClick();
    this.obterIndexData();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  getIconHeader() {
    return this.isOpen ? 'close-outline' : 'menu-2-outline';
  }

  changeMesPainel(type: string) {
    if (type === 'proximo') {
      const index = this.obterIndex(this.group[4].data);
      const totalIndex = this.data.length - 1;
      console.log(totalIndex);
      let min = 1;
      const max = 5;
      this.group = this.data.filter((e, ind) => {
        if ((index < ind) && index + 5 <= totalIndex) {
          const iformatado = min++;
          return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind + (min === 1 ? min : 0) );
        } else {
          return false;
        }
      });
      console.log(this.group);
    }
    // this.calendario.changeMes(type);
  }

  obterGrupoHoje() {
    const index = this.obterIndex(this.dataEvent);
    console.log(index);
    let min = 0;
    const max = 4;
    this.group = this.data.filter((e, ind) => {
      if (index <= ind) {
        const iformatado = min++;
        return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind);
      } else {
        return false;
      }
    });
    console.log(this.group);
  }

  isValidDate(index: number): boolean {
    console.log(this.data[index]);
    return !!this.data[index];
  }

  obterIndex(data): number {
    return this.data.map(e => moment(e.data).format('YYYY-MM-DD')).indexOf(moment(data).format('YYYY-MM-DD'));
  }

  obterGrupoClick() {
    const index = this.obterIndex(this.dataEvent);
    let min = -2;
    let max = 2;
    if (index - 2 < 0) {
      min = 0;
      max = 4;
      if (index - 1 === 0) {
        min = -1;
        max = 3;
      }
    }
    this.group = this.obterGrupo(min, max, index);
    console.log(this.group);
  }

  obterGrupo(min: number, max: number, index: number): any[] {
    return this.data.filter((e, ind) => {
      if (index - 2 <= ind) {
        const iformatado = min++;
        return (this.data[index + iformatado] && iformatado <= max) && (index + iformatado === ind);
      } else {
        return false;
      }
    });
  }

  dataSelecionada(evento) {
    this.visao = '1';
    this.dataEvent = moment(evento.diaCompleta).toDate();
    this.obterIndexData();
  }

  atualizarIndex(evento) {
    if (evento === '2') {
      this.obterIndexData();
    }
  }

  private obterIndexData(): void {
    let index = null;
    this.data.forEach((element, i) => {
      if (element.data === moment(this.dataEvent).format('YYYY-MM-DD')) {
        index = i;
      }
    });
    setTimeout(() => {
      this.calendario.index = Math.floor(index / 5);
    }, 0);
  }

  changeDiaPainel(type: string) {
    this.calendarioDoDia.changeDia(type);
    this.obterIndexData();
  }

  async mostrarLegendas() {
    this.dialogService.open(
      LegendasComponent,
      {
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  agendar(data) {
    this.dialogService.open(
      AgendarConsultaComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  alterarStatus(data) {
    this.dialogService.open(
      AlterarStatusComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }

  infoConsulta(data) {
    this.dialogService.open(
      DetalhesConsultaComponent,
      {
        context: {
          dados: data
        },
        closeOnEsc: true,
        autoFocus: false,
        closeOnBackdropClick: false,
        hasScroll: true
      }
    );
  }
}
