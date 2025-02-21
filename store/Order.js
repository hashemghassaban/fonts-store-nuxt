import * as OrderHttp from '../services/Order'

const initialState = () => ({})
export const state = initialState
export const mutations = {
  setState(state, payload) {
    if (payload === undefined) {
      state = payload

    } else {
      Object.keys(payload).map((key) => {
        state[key] = payload[key]
      })
    }
  },
}

export const actions = {
  GetPaymentGateways(context) {
    return OrderHttp.GetPaymentGateways()
  },
  GetCurrentUserOrdersCounts(context) {
    return OrderHttp.GetCurrentUserOrdersCounts()
  },
  GetCurrentUserFullOpenOrder(context) {
    return OrderHttp.GetCurrentUserFullOpenOrder()
  },
  GetDiscount(context) {
    return OrderHttp.GetDiscount()
  },
  GetCurrentUserOrders(context) {
    return OrderHttp.GetCurrentUserOrders()
  },
  GetOrderFactor(context, data) {
    return OrderHttp.GetOrderFactor(data)
  },
  GetShippingsCost(context, data) {
    return OrderHttp.GetShippingsCost(data)
  },
  VerifyChargeWallet(context, data) {
    return OrderHttp.VerifyChargeWallet(data)
  },
  VerifyPayOrder(context, data) {
    return OrderHttp.VerifyPayOrder(data)
  },
  PayOrder(context, data) {
    return OrderHttp.PayOrder(data)
  },
  GetUserWallet(context, data) {
    return OrderHttp.GetUserWallet(data)
  },
  ChargeWallet(context, data) {
    return OrderHttp.ChargeWallet(data)
  },
  GetShippings(context) {
    return OrderHttp.GetShippings()
  },
  AddProductToOrder({
    commit,
    state
  }, data, header) {
    return OrderHttp.AddProductToOrder(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  AddProductListToOrder({
    commit,
    state
  }, data, header) {
    return OrderHttp.AddProductListToOrder(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  RemoveOrderDetails({
    commit,
    state
  }, data, header) {
    return OrderHttp.RemoveOrderDetails(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  ApplyDiscount({
    commit,
    state
  }, data, header) {
    return OrderHttp.ApplyDiscount(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  UpdateOrderShipperAndAddress({
    commit,
    state
  }, data, header) {
    return OrderHttp.UpdateOrderShipperAndAddress(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  GetOrderFactorInfo({
    commit,
    state
  }, data, header) {
    return OrderHttp.GetOrderFactorInfo(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },
  DeleteDiscount({
    commit,
    state
  }, data, header) {
    return OrderHttp.DeleteDiscount(data, header).then((response) => {
      commit('setState', data)

      return response
    })
  },


  UpdateComment({
    commit,
    state
  }, data) {
    return ClubHttp.UpdateComment(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
  ReactToComment({
    commit,
    state
  }, data) {
    return ClubHttp.ReactToComment(data).then((response) => {
      commit('setState', data)

      return response
    })
  },
}
