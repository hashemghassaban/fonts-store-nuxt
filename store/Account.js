import * as AccountHttp from '../services/Account'

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

  LOGOUT() {
    localStorage.removeItem('token')
    localStorage.removeItem('lastUrL')
    this.$router.push('/signIn')
  },
}

export const actions = {
  Login({ commit, state }, data) {
    return AccountHttp.Login(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
  logOut({ commit }) {
    commit('LOGOUT')
  },
  Verify({ commit, state }, data) {
    return AccountHttp.Verify(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
  RefreshToken({ commit, state }, data) {
    return AccountHttp.RefreshToken(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
  ChangePassword({ commit, state }, data) {
    return AccountHttp.ChangePassword(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
  SendChangePassword({ commit, state }, data) {
    return AccountHttp.SendChangePassword(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
  PersonInfo(context, data) {
    return AccountHttp.PersonInfo(data)
  },
  UpdatePersonalInfo({ commit, state }, data) {
    return AccountHttp.UpdatePersonalInfo(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
}
