import * as AddressHttp from '../services/Address'

const initialState = () => ({})
export const state = initialState
export const mutations = {
  setState(state, payload) {
    Object.keys(payload).map((key) => {
      state[key] = payload[key]
    })
  },
}

export const actions = {

  GetUserAddresses({
    commit,
    state
  }, data, header) {
    return AddressHttp.GetUserAddresses(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  GetProvinces({
    commit,
    state
  }, data, header) {
    return AddressHttp.GetProvinces(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  GetCities({
    commit,
    state
  }, data, header) {
    return AddressHttp.GetCities(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  UpdateUserAddress({
    commit,
    state
  }, data, header) {
    return AddressHttp.UpdateUserAddress(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  AddUserAddress({
    commit,
    state
  }, data, header) {
    return AddressHttp.AddUserAddress(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  GetUserAddress(context, data) {
    return AddressHttp.GetUserAddress(data)
  },
  DeleteUserAddress({
    commit,
    state
  }, data, header) {
    return AddressHttp.DeleteUserAddress(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
}
