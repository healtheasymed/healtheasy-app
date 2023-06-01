const path = require('path');

/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const ESLintPlugin = require('eslint-webpack-plugin');

/* eslint func-names: 0 */
/* eslint global-require: 0 */

const { configure } = require('quasar/wrappers');

module.exports = configure((ctx) => ({
  // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
  supportTS: false,

  // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
  // preFetch: true,

  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  // https://v2.quasar.dev/quasar-cli-webpack/boot-files
  boot: [

  ],

  // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
  css: [
    'global.css',
  ],

  // https://github.com/quasarframework/quasar/tree/dev/extras
  extras: [
    // 'ionicons-v4',
    // 'fontawesome-v6',
    // 'eva-icons',
    // 'themify',
    // 'line-awesome',
    // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

    'roboto-font', // optional, you are not bound to it
    'material-icons', // optional, you are not bound to it
    'mdi-v6',
  ],

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
  build: {
    vueRouterMode: 'history', // available values: 'hash', 'history'
    env: {
      BASE_URL: process.env.NODE_ENV === 'production' ? 'https://www.healtheasy.com.br' : 'http://localhost:8081',
      SUPABASE_URL: 'https://jtejpujfkaxyzdsvyben.supabase.co',
      SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZWpwdWpma2F4eXpkc3Z5YmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA0Mzc0NzQsImV4cCI6MTk3NjAxMzQ3NH0.ntdTBpxTiQ1gDHCZwAcLSxcdYfLotIlcwzVq4oZHaI4',
      STRIPE_PUBLIC_KEY: 'pk_test_51MHA8JJKeXqQJBcnF7PGQKwduuxU6LaYdNU9O7HQQhDhWqES2kMdjV01TUycWn1kbDlZVHSaL4UEe42Kq0DciYcq005ySMMVXm',
      STRIPE_PLAN_1: 'price_1MHZrIJKeXqQJBcnI0GlDCsU',
      STRIPE_PLAN_2: 'price_1MHZstJKeXqQJBcnbwqLqJXx',
      STRIPE_PLAN_3: 'price_1MHZuXJKeXqQJBcnRsGJuhBv',
      EMAILJS_SERVICE_ID: 'service_2mqua0k',
      EMAILJS_TEMPLATE: 'template_e3te8fa',
      EMAILJS_USER_ID: 'hax-Z2Q7qPDYzd75t',
      MEMED_API_KEY: 'iJGiB4kjDGOLeDFPWMG3no9VnN7Abpqe3w1jEFm6olkhkZD6oSfSmYCm',
      MEMED_SECRET_KEY: 'Xe8M5GvBGCr4FStKfxXKisRo3SfYKI7KrTMkJpCAstzu2yXVN4av5nmL',
      MEMED_FRONTEND_DOMAIN: 'integrations.memed.com.br',
      MEMED_API_DOMAIN: 'integrations.api.memed.com.br',
    },
    // transpile: false,
    // publicPath: '/',

    // Add dependencies for transpiling with Babel (Array of string/regex)
    // (from node_modules, which are by default not transpiled).
    // Applies only if "transpile" is set to true.
    // transpileDependencies: [],

    // rtl: true, // https://quasar.dev/options/rtl-support
    // preloadChunks: true,
    // showProgress: false,
    // gzip: true,
    // analyze: true,

    // Options below are automatically set depending on the env, set them if you want to override
    // extractCSS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

    chainWebpack(chain) {
      chain
        .plugin('eslint-webpack-plugin')
        .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }]);

      chain.resolve.alias
        .set('@', path.resolve(__dirname, './src'));
    },

  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
  devServer: {
    server: {
      type: 'http',
    },
    port: 8081,
    open: false, // opens browser window automatically
  },

  // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
  framework: {
    config: {
      loading: true,
      brand: {
        primary: '#0E7BA8', // dark blue
        secondary: '#3DCDD4', // dark green
        accent: '#AC5EB0', // dark purple

        dark: '#000000', // black

        positive: '#54BD89', // green
        negative: '#E2183D', // red
        warning: '#F9971E', // yellow
        info: '#223CBB', // blue
      },
    },

    // iconSet: 'material-icons', // Quasar icon set
    lang: 'pt-BR', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],

    // Quasar plugins
    plugins: [
      'Notify',
      'Dialog',
      'Loading',
    ],
  },

  // animations: 'all', // --- includes all animations
  // https://quasar.dev/options/animations
  animations: 'all',

  // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
  ssr: {
    pwa: false,

    // manualStoreHydration: true,
    // manualPostHydrationTrigger: true,

    prodPort: 3000, // The default port that the production server should use
    // (gets superseded if process.env.PORT is specified at runtime)

    maxAge: 1000 * 60 * 60 * 24 * 30,
    // Tell browser when a file from the server should expire from cache (in ms)

    chainWebpackWebserver(chain) {
      chain.plugin('eslint-webpack-plugin')
        .use(ESLintPlugin, [{ extensions: ['js'] }]);
    },

    middlewares: [
      ctx.prod ? 'compression' : '',
      'render', // keep this as last one
    ],
  },

  // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
  pwa: {
    workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    workboxOptions: {}, // only for GenerateSW

    // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
    // if using workbox in InjectManifest mode

    chainWebpackCustomSW(chain) {
      chain.plugin('eslint-webpack-plugin')
        .use(ESLintPlugin, [{ extensions: ['js'] }]);
    },

    manifest: {
      name: 'Health Easy',
      short_name: 'Health Easy',
      description: 'Sistema de gerenciamento para profissionais atuantes na  área da saúde.',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#027be3',
      icons: [
        {
          src: 'icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
  cordova: {
    // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
  capacitor: {
    hideSplashscreen: true,
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
  electron: {
    bundler: 'packager', // 'packager' or 'builder'

    packager: {
      // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

      // OS X / Mac App Store
      // appBundleId: '',
      // appCategoryType: '',
      // osxSign: '',
      // protocol: 'myapp://path',

      // Windows only
      // win32metadata: { ... }
    },

    builder: {
      // https://www.electron.build/configuration/configuration

      appId: 'healtheasy-frontend',
    },

    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

    chainWebpackMain(chain) {
      chain.plugin('eslint-webpack-plugin')
        .use(ESLintPlugin, [{ extensions: ['js'] }]);
    },

    chainWebpackPreload(chain) {
      chain.plugin('eslint-webpack-plugin')
        .use(ESLintPlugin, [{ extensions: ['js'] }]);
    },

  },
}));
