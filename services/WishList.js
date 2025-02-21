import { context } from './index'

export default {
  type: 'Home',
  GetUserWishList,
  AddProductToWishList,
}

export function GetUserWishList(data) {
  return context.$axios({
    method: 'GET',
    url: '/Idp/Account/GetUserWishList',
    params: data,
    headers: {
      Authorization:
         process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function AddProductToWishList(data) {
  return context.$axios({
    method: 'POST',
    url: '/Idp/Account/AddProductToWishList',
    data: data,
    headers: {
      Authorization:
         process.client ? localStorage.getItem('token') : '',
      'Content-Type': 'application/json; charset=utf-8',
      accept: '*/*',
    },
  })
}

export function RemoveWishList(data) {
  return context.$axios({
    method: 'DELETE',
    url: '/Idp/Account/RemoveProductFromWishList',
    params: data,
    headers: {
      Authorization:
         process.client ? localStorage.getItem('token') : '',
      'Content-Type': 'application/json; charset=utf-8',
      accept: '*/*',
    },
  })
}
