const routes = [
  {
    path: '/:status?',
    name: 'landing',
    component: () => import('@/modules/landing/App.vue'),
  },
  {
    path: '/termos',
    name: 'termos',
    component: () => import('@/modules/landing/TermsAndConditions.vue'),
  },
  {
    path: '/privacidade',
    name: 'privacidade',
    component: () => import('@/modules/landing/PrivacyPolicy.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/login/Login.vue'),
        meta: { title: 'Login' },
      },
      {

        path: 'cadastro',
        name: 'register',
        component: () => import('pages/login/Register.vue'),
        meta: { title: 'Cadastre-se' },
      },
      {
        path: 'corfirmar-email',
        name: 'confirmation',
        component: () => import('pages/login/EmailConfirmation.vue'),
        meta: { title: 'Aguardando confirmação do e-mail' },
      },
      {
        path: 'recuperar-senha',
        name: 'forgot-password',
        component: () => import('pages/login/ForgotPassword.vue'),
        meta: { title: 'Recuperação de Senha' },
      },
      {
        path: 'nova-senha',
        name: 'reset-password',
        component: () => import('pages/login/ResetPassword.vue'),
        meta: { title: 'Alteração de Senha' },
      },
    ],
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {
        path: 'perfil',
        name: 'profile',
        component: () => import('pages/app/Profile.vue'),
      },
      {
        path: 'integracoes',
        name: 'integrations',
        component: () => import('pages/app/integrations/Index.vue'),
      },
      {
        path: 'memed',
        name: 'memed',
        component: () => import('pages/app/integrations/Memed.vue'),
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/app/Dashboard.vue'),
      },
      {
        path: 'agenda',
        name: 'appointments',
        component: () => import('pages/app/appointments/ListPage.vue'),
      },
      {
        path: 'atendimentos',
        name: 'treatments',
        component: () => import('pages/app/treatments/ListPage.vue'),
      },
      {
        path: 'cadastro-atendimento/:id?',
        name: 'form-treatment',
        component: () => import('pages/app/treatments/FormPage.vue'),
      },
      {
        path: 'cadastro-compromisso/:id?',
        name: 'form-appointment',
        component: () => import('pages/app/appointments/FormPage.vue'),
      },
      {
        path: 'pacientes',
        name: 'patients',
        component: () => import('pages/app/patients/ListPage.vue'),
      },
      {
        path: 'cadastro-paciente/:id?',
        name: 'form-patient',
        component: () => import('pages/app/patients/FormPage.vue'),
      },
      {
        path: 'medicos',
        name: 'doctors',
        component: () => import('pages/app/doctors/ListPage.vue'),
      },
      {
        path: 'cadastro-medico/:id?',
        name: 'form-doctor',
        component: () => import('pages/app/doctors/FormPage.vue'),
      },
      {
        path: 'financas',
        name: 'finances',
        component: () => import('pages/app/finances/ListPage.vue'),
      },
      {
        path: 'cadastro-financa/:id?',
        name: 'form-finance',
        component: () => import('pages/app/finances/FormPage.vue'),
      },
      {
        path: 'assinatura',
        name: 'subscription',
        component: () => import('pages/app/subscription/ListPage.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/main',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
