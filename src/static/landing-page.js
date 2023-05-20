export const menu = [
  {
    id: 1,
    name: 'Home',
    link: '#inicio',
  },
  {
    id: 2,
    name: 'Sobre',
    link: '#sobre-um',
  },
  {
    id: 3,
    name: 'Planos',
    link: '#planos',
  },
  {
    id: 4,
    name: 'Contato',
    link: '#contato',
  },
];

export const specialties = [
  {
    id: 1,
    name: 'Clínicas Médicas',
  },
  {
    id: 2,
    name: 'Hospitais',
  },
  {
    id: 3,
    name: 'Médicos',
  },
  {
    id: 4,
    name: 'Odontólogos',
  },
  {
    id: 5,
    name: 'Psicólogos',
  },
  {
    id: 6,
    name: 'Nutricionistas',
  },
];

export const features = [
  {
    id: 1,
    name: 'Funcionalidade 1',
    description:
      'Funcionalidade 1 Funcionalidade 1 Funcionalidade 1 Funcionalidade 1. Funcionalidade 1.',
    icon: 'Funcionalidade 1',
  },
  {
    id: 2,
    name: 'Funcionalidade 2',
    description:
      'Funcionalidade 1 Funcionalidade 1 Funcionalidade 1 Funcionalidade 1. Funcionalidade 1.',
    icon: 'Funcionalidade 1',
  },
  {
    id: 3,
    name: 'Funcionalidade 3',
    description:
      'Funcionalidade 1 Funcionalidade 1 Funcionalidade 1 Funcionalidade 1. Funcionalidade 1.',
    icon: 'Funcionalidade 1',
  },
  {
    id: 4,
    name: 'Funcionalidade 4',
    description:
      'Funcionalidade 1 Funcionalidade 1 Funcionalidade 1 Funcionalidade 1. Funcionalidade 1.',
    icon: 'Funcionalidade 1',
  },
  {
    id: 5,
    name: 'Funcionalidade 5',
    description:
      'Funcionalidade 1 Funcionalidade 1 Funcionalidade 1 Funcionalidade 1. Funcionalidade 1.',
    icon: 'Funcionalidade 1',
  },
];

export const plans = {
  defaultPrice: 29.9,
  options: [
    {
      id: process.env.STRIPE_PLAN_1,
      initial: 1,
      final: 4,
      discount: 0,
    },
    {
      id: process.env.STRIPE_PLAN_2,
      initial: 5,
      final: 10,
      discount: '0.1',
    },
    {
      id: process.env.STRIPE_PLAN_3,
      initial: 11,
      final: 20,
      price: 25.41,
      discount: '0.15',
    },
  ],
  services: [
    {
      id: 1,
      name: 'Suporte 24h',
      icon: 'mdi-check',
    },
    {
      id: 2,
      name: 'Suporte 24h',
      icon: 'mdi-check',
    },
    {
      id: 3,
      name: 'Suporte 24h',
      icon: 'mdi-check',
    },
    {
      id: 4,
      name: 'Suporte 24h',
      icon: 'mdi-cancel',
    },
    {
      id: 5,
      name: 'Suporte 24h',
      icon: 'mdi-cancel',
    },
    {
      id: 6,
      name: 'Suporte 24h',
      icon: 'mdi-cancel',
    },
  ],
};

export const sites = [
  // {
  //   id: 1,
  //   name: 'Facebook',
  //   icon: 'facebook',
  //   link: 'https://www.facebook.com/'
  // },
  // {
  //   id: 2,
  //   name: 'Twitter',
  //   icon: 'twitter',
  //   link: 'https://www.twitter.com/'
  // },
  {
    id: 3,
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/mwlite/company/healtheasy',
  },
  {
    id: 4,
    name: 'Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/healtheasyapp',
  },
];
