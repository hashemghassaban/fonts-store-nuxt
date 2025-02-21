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

  modules: [
    '@nuxtjs/axios',
    // 'nuxt-lazy-load',
    '@nuxt/icon',


    // '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
  ],
  icon: {
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/img/icon/'
      }
    ]
  },



  axios: {
    baseURL: 'https://gateway.alasaz.com',
  },

  generate: {
    fallback: true,
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
    loaders: {
      raw: {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    }

  },
}
