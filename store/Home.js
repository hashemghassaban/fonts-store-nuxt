import * as HomeHttp from '../services/Home'

const initialState = () => ({
  phoneNumber: '',
})
export const state = initialState
export const mutations = {
  setState(state, payload) {
    Object.keys(payload).map((key) => {
      state[key] = payload[key]
    })
  },
}

export const actions = {
  GetHomeBanners(ctx) {
    return HomeHttp.GetHomeBanners().then((response) => {
      let type = Object.keys(response.data)[0]

      ctx.commit('setState', { profileType: type })
      ctx.commit('setState', { profileData: response.data[type] })

      return response
    })
  },

  GetHomeBanners({ commit, state }) {
    return HomeHttp.GetHomeBanners()
  },
  GetHomeProduct(ctx) {
    return HomeHttp.GetHomeProduct().then((response) => {
      let type = Object.keys(response.data)[0]

      ctx.commit('setState', { profileType: type })
      ctx.commit('setState', { profileData: response.data[type] })

      return response
    })
  },

  GetHomeProduct({ commit, state }) {
    return HomeHttp.GetHomeProduct()
  },
  GetHomeBrands(ctx) {
    return HomeHttp.GetHomeBrands().then((response) => {
      let type = Object.keys(response.data)[0]

      ctx.commit('setState', { profileType: type })
      ctx.commit('setState', { profileData: response.data[type] })

      return response
    })
  },

  GetHomeBrands({ commit, state }) {
    return HomeHttp.GetHomeBrands()
  },
}
