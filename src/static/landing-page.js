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
    name: 'Médicos',
  },
  {
    id: 2,
    name: 'Fisioterapeutas',
  },
  {
    id: 3,
    name: 'Odontólogos',
  },
  {
    id: 4,
    name: 'Psicológos',
  },
  {
    id: 5,
    name: 'Nutricionistas',
  },
  {
    id: 6,
    name: 'Hospitais',
  },
];

export const features = [
  {
    id: 1,
    name: 'Tela de Atendimento',
    description:
      '- Acompanhamento de consultas e pacientes; </br> - Informações de agendamento, status de consulta e histórico de atendimentos; </br> - Possibilidade de reagendamento ou cancelamento de consultas',
    icon: 'Funcionalidade 1',
  },
  {
    id: 2,
    name: 'Agenda Eletrônica',
    description:
      '- Gerenciamento de horários com facilidade; </br> - Planejamento e organização do dia para garantir produtividades; </br> - Visualização rápida de horários disponíveis e ocupados',
    icon: 'Funcionalidade 1',
  },
  {
    id: 3,
    name: 'Prontuário Digital',
    description:
      '- Simplificação do gerenciamento de informações do paciente; </br> - Acesso fácil a anamneses e histórico de atendimentos; </br> - Possibilidade de adicionar e editar informações sobre o paciente',
    icon: 'Funcionalidade 1',
  },
  {
    id: 4,
    name: 'Prescrição e Solicitação de Exames',
    description:
      '- Possibilidade de gerenciar a prescrição de medicamentos e solicitação de exames; </br> - Integração com a plataforma MEMED para agilizar e simplificar esses processos; </br> - Rastreamento fácil de prescrições e solicitações pendentes',
    icon: 'Funcionalidade 1',
  },
  {
    id: 5,
    name: 'Resultado de Exames',
    description:
      '- Gerenciamento e publicação de resultados de exames de maneira rápida e eficiente; </br> - Acesso fácil e rápido a resultados de exames do paciente; </br> - Possibilidade de imprimir e compartilhar resultados de exames com o paciente',
    icon: 'Funcionalidade 1',
  },
  {
    id: 6,
    name: 'Gestão Financeira',
    description:
      '- Gerenciamento de pagamentos de planos, particulares e impostos; </br> - Visualização clara do fluxo de caixa; </br> - Controle de custos gerais e gastos da clínica ou consultório médicos',
    icon: 'Funcionalidade 1',
  },
  {
    id: 7,
    name: 'Tela de Farmácia',
    description:
      '- Controle de medicamentos; </br> - Possibilidade de gerenciamento de estoque de medicamentos; </br> - Acesso fácil e rápido a informações sobre medicamentos em uso pelos pacientes',
    icon: 'Funcionalidade 1',
  },
  {
    id: 8,
    name: 'Prevenção de doenças e complicações',
    description:
      '- Acompanhamento de doenças crônicas; </br> - Gerenciamento de informações de saúde dos pacientes; </br> - Possibilidade de rastreamento e monitoramento de doenças crônicas',
    icon: 'Funcionalidade 1',
  },
  {
    id: 9,
    name: 'Laboratório',
    description:
      '- Marcação de exames; </br> - Publicação de resultados de exames; </br> - Acesso rápido e fácil a informações sobre exames e resultados',
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
      id: 0,
      name: 'Tela de Atendimento',
      icon: 'mdi-check',
    },
    {
      id: 1,
      name: 'Agenda Eletrônica',
      icon: 'mdi-check',
    },
    {
      id: 2,
      name: 'Prontuário Digital',
      icon: 'mdi-check',
    },
    {
      id: 3,
      name: 'Prescrição e Solicitação de Exames',
      icon: 'mdi-check',
    },
    {
      id: 4,
      name: 'Resultado de Exames',
      icon: 'mdi-check',
    },
    {
      id: 5,
      name: 'Gestão Financeira',
      icon: 'mdi-check',
    },
    {
      id: 6,
      name: 'Tela de Farmácia',
      icon: 'mdi-check',
    },
    {
      id: 7,
      name: 'Prevenção Primária',
      icon: 'mdi-check',
    },
    {
      id: 8,
      name: 'Laboratório',
      icon: 'mdi-check',
    },
    {
      id: 9,
      name: 'Suporte 24h',
      icon: 'mdi-check',
    },
    // {
    //   id: 6,
    //   name: 'Suporte 24h',
    //   icon: 'mdi-cancel',
    // },
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
    name: 'Whatsapp',
    icon: 'whatsapp',
    link: 'https://wa.me/558540426250/?text=Olá!%20Estou%20entrando%20em%20contato%20através%20do%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20Health%20Easy.%20',
  },
  {
    id: 4,
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/company/healtheasy/',
  },
  {
    id: 5,
    name: 'Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/healtheasyapp',
  },
  {
    id: 6,
    name: 'E-mail',
    icon: 'email',
    link: 'mailto:contato@healtheasy.com.br?subject=Contato%20-%20Site&body=Olá!%20Estou%20entrando%20em%20contato%20através%20do%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20Health%20Easy.%20',
  },
];
