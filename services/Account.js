import { context } from './index'

export default {
  type: 'Account',
  Login,
  Verify,
}

export function Login(data) {
  return context.$axios({
    method: 'POST',
    url: '/Idp/Account/LoginViaPhoneNumber',
    data: data,
  })
}

export function Verify(data) {
  return context.$axios({
    method: 'POST',
    url: '/Idp/Account/LoginViaPhoneNumberCode',
    data: data,
  })
}
export function RefreshToken(data) {
  return context.$axios({
    method: 'POST',
    url: '/Idp/Account/RefreshToken',
    params: data,
    headers: {
      Authorization: process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function SendChangePassword(data) {
  return context.$axios({
    method: 'PUT',
    url: '/Idp/Account/SendChangePasswordVerificationCode',
    data: data,
    headers: {
      Authorization: process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function ChangePassword(data) {
  return context.$axios({
    method: 'PUT',
    url: '/Idp/Account/ChangePassword',
    data: data,
    headers: {
      Authorization: process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function PersonInfo() {
  return context.$axios({
    method: 'POST',
    url: '/Idp/Account/GetAccountPersonalInfo',
    headers: {
      Authorization: process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function UpdatePersonalInfo(data) {
  return context.$axios({
    method: 'PUT',
    url: '/Idp/Account/UpdateAccountPersonalInfo',
    data,
    headers: {
      Authorization: process.client ? localStorage.getItem('token') : '',
    },
  })
}
