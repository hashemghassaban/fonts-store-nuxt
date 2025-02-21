import { context } from './index'

export default {
  type: 'Home',
}


export function GetUserAddresses(data, header) {
  return context.$axios({
    method: 'Get',
    url: '/Idp/Account/GetUserAddresses',
    data: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function UpdateUserAddress(data) {
  return context.$axios({
    method: 'PUT',
    url: 'Idp/Account/UpdateUserAddress',
    data: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function AddUserAddress(data) {
  return context.$axios({
    method: 'POST',
    url: 'Idp/Account/AddUserAddress',
    data: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetProvinces(data) {
  return context.$axios({
    method: 'GET',
    url: 'Idp/Common/GetProvinces',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetCities(data) {
  return context.$axios({
    method: 'GET',
    url: 'Idp/Common/GetCitiesOfProvince',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetUserAddress(data) {
  return context.$axios({
    method: 'GET',
    url: 'Idp/Account/GetUserAddress',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function DeleteUserAddress(data) {
  return context.$axios({
    method: 'DELETE',
    url: 'Idp/Account/DeleteUserAddress',
    params: data,
    headers: {
      Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
