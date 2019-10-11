import * as moment from 'moment';
import { CalendarioService } from '../../../shared/services/calendarios.service';

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
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${value.nome}`;
      }
    },
    diaSemana: {
      title: 'Dia da semana',
      type: 'string',
      valuePrepareFunction: (value) => {
        return CalendarioService.formatarDay(value || 1).extenso;
      }
    },
    datas: {
      title: 'Vigência',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${moment(value.dataVigenciaInicio).format('DD/MM/YYYY')} - ${moment(value.dataVigenciaFim).format('DD/MM/YYYY')}`;
      }
    },
    horas: {
      title: 'Horário',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${value.horaInicio} - ${value.horaFim}`;
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
      type: 'string'
    },
    datas: {
      title: 'Datas',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${moment(value.dataInicio).format('DD/MM/YYYY')} - ${moment(value.dataFim).format('DD/MM/YYYY')}`;
      }
    },
    horas: {
      title: 'Horários',
      type: 'string',
      valuePrepareFunction: (value) => {
        return `${moment(value.horaInicio).format('HH:mm')} - ${moment(value.horaFim).format('HH:mm')}`;
      }
    }
  }
};
