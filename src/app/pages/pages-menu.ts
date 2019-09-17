import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
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
      },
      {
        title: 'Adicionar paciente',
        link: '/pacientes/adicionar',
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
        title: 'Profissionais de saúde',
        link: '/configuracoes/profissionais-de-saude',
      },
      {
        title: 'Unidades de atendimento',
        link: '/configuracoes/unidades-de-atendimento',
      }
    ]
  },
];
