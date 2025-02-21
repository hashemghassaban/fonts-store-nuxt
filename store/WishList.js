import * as WishListHttp from '../services/WishList'

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
  GetUserWishList(context, data) {
    return WishListHttp.GetUserWishList(data)
  },
  AddProductToWishList({
    commit,
    state
  }, data, header) {
    return WishListHttp.AddProductToWishList(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  RemoveWishList({
    commit,
    state
  }, data, header) {
    return WishListHttp.RemoveWishList(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },


}
