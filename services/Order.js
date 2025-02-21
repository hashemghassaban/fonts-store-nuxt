import { context } from './index'

export default {
  type: 'Home',
  AddProductToOrder,
}

export function GetCurrentUserFullOpenOrder() {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/GetCurrentUserFullOpenOrder',
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetCurrentUserOrders() {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/GetCurrentUserOrders',
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetCurrentUserOrdersCounts() {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/GetCurrentUserOrdersCounts',
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetShippingsCost(data) {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/CalculateOpenOrderShippingCost',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetShippings() {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/GetShippings',
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function PayOrder(data) {
  return context.$axios({
    method: 'POST',
    url: '/Order/Order/PayOrder',
    data: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function VerifyChargeWallet(data) {
  return context.$axios({
    method: 'GET',
    url: '/Order/Wallet/VerifyChargeWallet',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetOrderFactor(data) {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/GetOrderFactor',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function VerifyPayOrder(data) {
  return context.$axios({
    method: 'POST',
    url: '/Order/Order/VerifyPayOrder',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function AddProductToOrder(data) {
  return context.$axios({
    method: 'POST',
    url: '/Order/Order/AddProductToOrder',
    data: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
      'Content-Type': 'application/json-patch+json',
    },
  })
}
export function AddProductListToOrder(data) {
  return context.$axios({
    method: 'POST',
    url: '/Order/Order/AddProductListToOrder',
    data: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
      'Content-Type': 'application/json-patch+json',
    },
  })
}
export function RemoveOrderDetails(data) {
  return context.$axios({
    method: 'DELETE',
    url: '/Order/Order/RemoveOrderDetailsFromOrder',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
      'Content-Type': 'application/json-patch+json',
    },
  })
}

export function ApplyDiscount(data) {
  return context.$axios({
    method: 'PUT',
    url: '/Order/Order/ApplyDiscountOnOpenOrder',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function UpdateOrderShipperAndAddress(data) {
  return context.$axios({
    method: 'PUT',
    url: '/Order/Order/UpdateOrderShipperAndAddress',
    data: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetOrderFactorInfo(data) {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/GetOrderFactorInfo',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function DeleteDiscount() {
  return context.$axios({
    method: 'DELETE',
    url: '/Order/Order/RemoveDiscountFromOpenOrder',
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetDiscount(data) {
  return context.$axios({
    method: 'get',
    url: '/Order/Order/discount',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}

export function GetUserWallet(data) {
  return context.$axios({
    method: 'GET',
    url: '/Order/Wallet/GetUserWallet',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function ChargeWallet(data) {
  return context.$axios({
    method: 'GET',
    url: '/Order/Wallet/ChargeWallet',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetPaymentGateways() {
  return context.$axios({
    method: 'GET',
    url: '/Order/Order/GetPaymentGateways',
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
