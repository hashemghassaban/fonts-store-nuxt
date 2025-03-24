export const state = () => ({
  theme: 'monely',
  siteTitle: '',
  menu: false,
  siteLogo: '',
  siteIcon: '',
  description: '',
  keywords: '',
  categories: [],
  promotions: [],
  loading: false,
  socials: [],
  setting:[],
  footerMenu: [],
  dialog: false,
  totalCart: 0,
  cart: {},
  namad:{},
  user: {},
  hasShipping: false,
  currencyUnit: '',
  loginModal: false,
  onSearch: false,
  theme_color: '',
  productFilters: {
    category: [],
    brand: [],
    detail: {},
    feature: {},
    price_start: 0,
    price_end: 0,
  },
  headerSlide: []
})

export const mutations = {
  toggleMenu(state, bool) {
    state.menu = bool
  },
  setSettings(state, settings) {
    state.siteIcon = settings.settings.favicon
    state.siteLogo = settings.settings.logo
    state.description = settings.settings.description
    state.siteTitle = settings.settings.title
    state.keywords = settings.settings.keywords
    state.headerSlide = settings.slids.header
    state.categories = settings.categories
    state.footerMenu = settings.footer_menu
    state.currencyUnit = settings.currency_unit ?? 'ت'
    state.socials = settings.socials
    state.promotions = settings.promotions
    state.collections = settings.collections
    state.user = settings.user
  },

  setLoading(state, loading) {
    state.loading = loading
  },
  setDialogCart(state, value) {
    state.dialog = value
  },
  setCart(state, cart) {
    state.totalCart = cart.total
    state.cart = cart
    state.hasShipping = cart.shipping_status
  },
  setEnamad(state, payload) {
    state.namad = payload
  },
  setSetting(state, payload) {
    state.setting = payload

  },
  openLogin(state) {
    state.loginModal = true
  },

  closeLogin(state) {
    state.loginModal = false
  },
  setUser(state, data) {
    state.user = data
  },

}

export const getters = {
  totalCount: (state) => `${state.cart.cart_items_sum_count || 0}`,
  totalCart: (state) => `${state.totalCart || 0}`,
  payableCart: (state) => `${state.cart.payable  || 0}`,
  discountCart: (state) => `${state.cart.discount || 0}`,
  hasProduct: (state) => {
    return state.cart?.items
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, error, $axios, $vuetify }) {
    try {
      const data = await $axios({
        url: '/layout/web',
        method: 'get',
        raise: true,
      })
      commit('setSettings', data)
    } catch (e) {}
  },
}
