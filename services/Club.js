import { context } from './index'


export default {
  type: 'Home',
  GetComments,
}

export function GetComments(data) {
  return context.$axios({
    method: 'GET',
    url: '/Club/Club/GetProductComments',
    params: data,
  })
}
export function GetUserComments(data) {
  return context.$axios({
    method: 'GET',
    url: '/Club/Club/GetUserComments',
    params: data,
    headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '', 
    },
  })
}
export function AddComment(data, header) {
  return context.$axios({
    method: 'POST',
    url: '/Club/Club/AddComment',
    data: data,
    headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '', 
    },
  })
}
export function AddQuestion(data, header) {
  return context.$axios({
    method: 'POST',
    url: '/Club/Club/AddQuestion',
    data: data,
    headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '', 
    },
  })
}
export function UpdateComment(data) {
  return context.$axios({
    method: 'PUT',
    url: '/Club/Club/UpdateComment',
    data: data,
    headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '', 
    },
  })
}
export function ReactToComment(data) {
  return context.$axios({
    method: 'POST',
    url: '/Club/Club/ReactToComment',
    data: data,
    headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '', 
    },
  })
}