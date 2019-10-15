import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';
import { CellAgendaTableComponent } from './cell-agenda-table.component';

export const DATA_TABLE_CALENDARIO = {
  noDataMessage: 'Sem dados',
  hideSubHeader: true,
  mode: 'external',
  actions: {
    columnTitle: 'Ações',
    position: 'right',
    custom: [
      {
        name: 'perfil',
        title: '<i class="nb-search"></i>'
      },
      {
        name: 'edit',
        title: '<i class="nb-edit"></i>'
      },
      {
        name: 'delete',
        title: '<i class="nb-trash"></i>'
      }
    ],
    add: false,
    edit: false,
    delete: false
  },
  columns: {
    consultorio: {
      title: 'Consultório',
      type: 'custom',
      renderComponent: CellAgendaTableComponent
    },
    diaSemana: {
      title: 'Dia da semana',
      type: 'string',
      valuePrepareFunction: (value) => {
        return CalendarioService.formatarDay(value || 1).extenso;
      }
    },
    horas: {
      title: 'Horário',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${value.horaInicio} - ${value.horaFim}`;
      }
    },
    datas: {
      title: 'Vigência',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${moment(value.dataVigenciaInicio).format('DD/MM/YYYY')} - ${moment(value.dataVigenciaFim).format('DD/MM/YYYY')}`;
      }
    },
  }
};

export const DATA_TABLE_BLOQUEIO = {
  noDataMessage: 'Sem dados',
  hideSubHeader: true,
  mode: 'external',
  actions: {
    columnTitle: 'Ações',
    position: 'right',
    custom: [
      {
        name: 'perfil',
        title: '<i class="nb-search"></i>'
      },
      {
        name: 'edit',
        title: '<i class="nb-edit"></i>'
      },
      {
        name: 'delete',
        title: '<i class="nb-trash"></i>'
      }
    ],
    add: false,
    edit: false,
    delete: false
  },
  columns: {
    consultorio: {
      title: 'Consultório',
      type: 'custom',
      renderComponent: CellAgendaTableComponent
    },
    dataInicio: {
      title: 'Data início',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${moment(value.dataInicio).format('DD/MM/YYYY')} - ${moment(value.horaInicio).format('HH:mm')}`;
      }
    },
    dataFim: {
      title: 'Data fim',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${moment(value.dataFim).format('DD/MM/YYYY')} - ${moment(value.horaFim).format('HH:mm')}`;
      }
    }
  }
};
