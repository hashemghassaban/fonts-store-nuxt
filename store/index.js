import setState from '~/utils/setState'

let dayCareLocal = []
if (process.client) {
  dayCareLocal = window.localStorage.getItem('dayCare')
}

export const state = () => ({
  isLoading: false,
  auth: process.client ? !!window.localStorage.getItem('token') : [],
  menu: [],
  dayCare: dayCareLocal ? dayCareLocal : [],
  dayCareServer: [],
  installPwa: false,
  amountWallet: 0,
  version: '4.5.10',
})
export const mutations = {
  setBalance(state, payload) {
    state.amountWallet = payload
  },
  pushDataToCart(state, dayCareServer) {
    state.dayCareServer = dayCareServer
  },

  pushDaycareToCart(state, dayCare) {
    let data = []
    if (process.client) {
      data = window.localStorage.getItem('dayCare')
    }

    state.dayCare = data ? JSON.parse(data) : []
    let itemInCart = state.dayCare.filter((item) => item.id === dayCare.id)
    let isItemInCart = itemInCart.length > 0
    if (isItemInCart === false) {
      state.dayCare.push(dayCare)
      dayCare.quantity = 1
    } else {
      dayCare.quantity += 1
    }

    // state.dayCare.push(dayCare)
    this.commit('saveCart')
  },

  pushDetailToCart(state, item) {
    let dataTotal = process.client ? window.localStorage.getItem('dayCare') : []
    state.dayCare = dataTotal ? JSON.parse(dataTotal) : []
    let result = state.dayCare.filter((data) => {
      if (data?.productVariationId) {
        return (
          data?.productVariationId === item?.productVariationId &&
          data?.id === item?.id
        )
      } else {
        return data?.id === item?.id
      }
    })
    if (!!result.length === false) {
      state.dayCare.push(item)
      this.$toast.success('محصول  به سبد اضافه شد ', {
        timeout: 4000,
      })
    }
    this.commit('saveCart')
  },
  removeFromCart(state, item) {
    state.dayCare = state.dayCare.filter((data) => {
      if (data?.productVariationId) {
        return data?.productVariationId != item?.productVariationId
      } else {
        return data?.id != item?.id
      }
    })

    this.commit('saveCart')
  },

  increaseCart(state, index) {
    let data = process.client ? window.localStorage.getItem('dayCare') : []
    state.dayCare = data ? JSON.parse(data) : []
    state.dayCare[index].quantity++
    this.commit('saveCart')
  },
  decreaseCart(state, index) {
    if (state.dayCare[index].quantity > 0) {
      state.dayCare[index].quantity--
    }
    this.commit('saveCart')
  },
  saveCart(state) {
    if (process.client) {
      window.localStorage.setItem('dayCare', JSON.stringify(state.dayCare))
    }
  },
  MUTATE_MENU(state, payload) {
    state.menu = payload
  },
  setState(state, payload) {
    Object.keys(payload).map((key) => {
      state[key] = payload[key]
    })
  },
  LOGOUT(state) {
    state.auth = null
    localStorage.removeItem('token')
    localStorage.removeItem('lastUrL')
    this.$router.push('/signIn')
    state.dayCare = []
  },
  LOGIN_FAIL(state, error) {
    state.error = error
  },
  install(state, installPwa) {
    if (installPwa) {
      state.installPwa = true
    } else state.installPwa = false
  },
  loading(state, isLoading) {
    if (isLoading) {
      state.isLoading = true
    } else state.isLoading = false
  },
  setMenu(state, payload) {
    state.menu = payload
  },
}

export const actions = {
  getMenu({ commit }) {
    commit('setMenu')
  },
  getBalance({ commit }) {
    commit('setBalance')
  },
  increaseCart({ commit }, index) {
    commit('increaseCart', index)
  },
  decreaseCart({ commit }, index) {
    commit('decreaseCart', index)
  },
  dayCareCart({ commit }, dayCare) {
    commit('pushDaycareToCart', dayCare)
  },
  setCart({ commit }, dayCareServer) {
    commit('pushDataToCart', dayCareServer)
  },
  DetailToCart({ commit }, dayCare) {
    commit('pushDetailToCart', dayCare)
  },
  getMenu({ commit }, payload) {
    commit('MUTATE_MENU', payload)
  },

  logOut({ commit }) {
    commit('LOGOUT')
  },
  SearchRequest(_, payload) {
    return GlobalHttp.SearchRequest(payload.title)
  },
}
export const getters = {
  getBalance(state) {
    return state.amountWallet
  },
  getVersion(state) {
    return state.version
  },
  getMenu(state) {
    return state.menu
  },
  getCart(state) {
    return state.dayCareServer
  },

  dayCareItems(state) {
    return state.dayCare
  },
  dayCareClear(state) {
    return (state.dayCare = [])
  },
  isLoggedIn(state) {
    return !!state.auth
  },
}
export const plugins = [setState()]
