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
  public medico = '1';
  public lugar = '1';
  public especialidade = '1';
  public dataEvent: any = moment().toDate();
  public filter: any;
  public dayCellComponent = CalendarCustomDayCellComponent;

  @ViewChild(CalendarioComponent, { static: false }) calendario: CalendarioComponent;
  @ViewChild(CalendarioDoDiaComponent, { static: false }) calendarioDoDia: CalendarioDoDiaComponent;

  constructor(iconsLibrary: NbIconLibraries,
    public calendarioService: CalendarioService,
    public calendarioMock: CalendarioData,
    private dialogService: NbDialogService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  async ngOnInit() {
    this.isLoading = true;
    await this.calendarioMock.getDataWithLoading().then(response => {
      this.data = response;
      this.filter = (date) => {
        return this.data.map(e => e.data).indexOf(moment(date).format('YYYY-MM-DD')) > -1;
      };
      this.obterIndexData();
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
  }

  changeDia(event) {
    this.dataEvent = moment(event).format('YYYY-MM-DD');
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
    this.calendario.changeMes(type);
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
