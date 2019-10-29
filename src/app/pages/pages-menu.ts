import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADM: NbMenuItem[] = [
  {
    title: 'Início',
    icon: 'home-outline',
    link: '/home',
    home: true,
  },
  {
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
    title: 'Recepcionista',
    icon: 'book-outline',
    children: [
      {
        title: 'Calendário',
        link: '/recepcionista/calendario',
      },
    ]
  },
  {
    title: 'Pacientes',
    icon: 'person-outline',
    children: [
      {
        title: 'Listagem de pacientes',
        link: '/pacientes/listagem',
      }
    ]
  },
  {
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
      },
      {
        title: 'Cadastros',
        link: '/configuracoes/unidades-de-atendimento',
        children: [
          {
            title: 'Prontuários',
            link: '/cadastros/prontuarios',
          },
          {
            title: 'Modelos de documentos',
            link: '/cadastros/modelos-documentos',
          },
          {
            title: 'Configuração dos documentos',
            link: '/configuracoes/unidades-de-atendimento',
          },
          {
            title: 'Assinatura digital',
            link: '/configuracoes/unidades-de-atendimento',
          },
        ]
      }
    ]
  },
];


export const MENU_ITEMS_MED: NbMenuItem[] = [
  {
    title: 'Início',
    icon: 'home-outline',
    link: '/home',
    home: true,
  },
  {
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
    title: 'Configurações',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Cadastros',
        link: '/configuracoes/unidades-de-atendimento',
        children: [
          {
            title: 'Prontuários',
            link: '/configuracoes/unidades-de-atendimento',
          },
          {
            title: 'Modelos de documentos',
            link: '/configuracoes/unidades-de-atendimento',
          },
          {
            title: 'Configuração dos documentos',
            link: '/configuracoes/unidades-de-atendimento',
          },
          {
            title: 'Assinatura digital',
            link: '/configuracoes/unidades-de-atendimento',
          },
        ]
      }
    ]
  },
];

export const MENU_ITEMS_RECEP: NbMenuItem[] = [
  {
    title: 'Início',
    icon: 'home-outline',
    link: '/home',
    home: true,
  },
  {
    title: 'Recepcionista',
    icon: 'book-outline',
    children: [
      {
        title: 'Calendário',
        link: '/recepcionista/calendario',
      },
    ]
  },
  {
    title: 'Pacientes',
    icon: 'person-outline',
    children: [
      {
        title: 'Listagem de pacientes',
        link: '/pacientes/listagem',
      }
    ]
  },
  {
    title: 'Configurações',
    icon: 'settings-2-outline',
    children: [
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
];
