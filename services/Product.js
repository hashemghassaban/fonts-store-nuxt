import { context } from './index'


export default {
  type: 'Home',
  GetProductDetails,
  GetCategoryProducts,
}

export function GetProductDetails(data) {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetProductDetails',
    params: data,
    headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetProducts(data) {
  return context.$axios({
    method: 'POST',
    url: '/Product/Product/GetProducts',
    data: data,
    headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '',
     'Content-Type': 'application/json-patch+json',
    },
  })
}
export function GetProductsShortData(data) {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetProductsShortData',
    params: data,
        headers: {
     Authorization:  process.client ? localStorage.getItem('token') : '',
    },
  })
}
export function GetCategoryProducts(data) {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetCategoryProducts',
    params: data,
  })
}

export function GetCategoryList() {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetCategories',
  })
}
export function GetBrandProducts(data) {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetBrandProducts',
    params: data,
  })
}
export function GetWarrantyProducts(data) {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetWarrantyProducts',
    params: data,
  })
}
