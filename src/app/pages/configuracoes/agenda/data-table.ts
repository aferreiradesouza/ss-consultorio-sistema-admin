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
  } as any
};
