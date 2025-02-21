import * as ClubHttp from '../services/Club'

const initialState = () => ({
 
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


  GetComments(context, data) {
    return ClubHttp.GetComments(data)
  },
  GetUserComments(context, data) {
    return ClubHttp.GetUserComments(data)
  },
  AddComment({ commit, state }, data, header) {
    return ClubHttp.AddComment(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  AddQuestion({ commit, state }, data, header) {
    return ClubHttp.AddQuestion(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  UpdateComment({ commit, state }, data) {
    return ClubHttp.UpdateComment(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
  ReactToComment({ commit, state }, data) {
    return ClubHttp.ReactToComment(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
}
