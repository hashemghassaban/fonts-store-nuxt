import colors from 'vuetify/es5/util/colors'
export default {
  head: {
    title: '',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  // bridge: true, // Enable Nuxt Bridge
  loading: {
    color: '#FAC569',
    height: '5px',
  },
  css: [
    '~/assets/scss/main',
    '~/assets/fonts/fonticon/style.css',

    // 'swiper/css/swiper.css',
  ],
  styleResources: {
    scss: ['@/assets/scss/main.scss'],
  },

  target: 'server',
  plugins: [
    '~/plugins/icons',
    '~/plugins/axios',
    '~/plugins/toast.js'

  ],
  server: {
    port: 8089,
    host: 'localhost', // default: localhost
  },
  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
    'nuxt-countdown'
  ],
  vuex: {
    modules: {
      api: '~/store/api.js'
    }
  },
  modules: [
    '@nuxtjs/axios',
    [
      'vue-toastification/nuxt',
      {
        timeout: 10000,
        draggable: false,
      },
    ],
    '@nuxt/icon',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap'
],
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/img/icon/'
      }
    ]
  },

  sitemap: {
    hostname: 'https://linotyper.com',

    routes: [
      '/blogDetail/:slug',
      '/categories/:slug',
      '/categories/detail/:slug',
      '/designer/detail/:slug',
      '/page/:slug',
      '/product/detail/:slug',
      '/promotions/:slug',
      '/promotions/:slug',
    ],
  },

  toast: {
    position: 'bottom-left',
    iconPack: 'custom-class',
    duration: 3000,
    icon: {
      name: 'toast-info',
    },
    action: {
      icon: 'toast-close',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
    },
  },
  axios: {
    prefix: process.env.API_PREFIX,
    withCredentials: true,
    proxy: true,
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://faryadresan.ir/api/v1',
  },
  generate: {
    fallback: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000'
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/user', method: 'get' }
        }
      }
    }
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    treeShake: true,
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      dark: false,
      default: 'light',
      disable: false,
      options: {
        cspNonce: 'dQw4w9WgXcQ',
        customProperties: true,
        variations: true,
      },
      themes: {
        light: {
          primary: '#FF7A00',
          accent: '#f5f5f5',
          secondary: "#AAE73E",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  build: {
    extractCSS: true,
  },
}
