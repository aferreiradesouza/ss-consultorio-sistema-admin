import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_DEFAULT: any[] = [
  {
    order: 1,
    title: 'Início',
    icon: 'home-outline',
    link: '/home',
    home: true,
  },
  {
    order: 2,
    title: 'Pacientes',
    icon: 'person-outline',
    children: [
      {
        title: 'Listagem de pacientes',
        link: '/pacientes/listagem',
      }
    ]
  }
];

export const MENU_ITEMS_ADM: any[] = [
  {
    order: 6,
    title: 'Configurações',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Unidades de atendimento',
        link: '/configuracoes/unidades-de-atendimento',
      },
      {
        title: 'Usuários',
        link: '/configuracoes/usuarios',
      },
      {
        title: 'Agenda',
        link: '/configuracoes/agenda',
      }
    ]
  },
  {
    order: 5,
    title: 'Cadastros',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Anamnese',
        link: '/cadastros/anamnese',
      },
      {
        title: 'Modelos de documentos',
        link: '/cadastros/modelos-documentos',
      }
    ]
  }
];

export const MENU_ITEMS_MED: any[] = [
  {
    order: 3,
    title: 'Médico',
    icon: 'activity-outline',
    children: [
      {
        title: 'Agenda do dia',
        link: '/medico/agenda-do-dia',
      },
    ]
  },
  {
    order: 5,
    title: 'Cadastros',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Anamnese',
        link: '/cadastros/anamnese',
      },
      {
        title: 'Modelos de documentos',
        link: '/cadastros/modelos-documentos',
      }
    ]
  }
];

export const MENU_ITEMS_RECEP: any[] = [
  {
    order: 4,
    title: 'Recepcionista',
    icon: 'book-outline',
    children: [
      {
        title: 'Calendário',
        link: '/recepcionista/calendario',
      },
    ]
  }
];
