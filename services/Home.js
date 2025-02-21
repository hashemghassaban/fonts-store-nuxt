import { context } from './index'

export default {
  type: 'Home',
  GetHomeBanners,
  GetHomeBrands,
  GetHomeProduct
}

export function GetHomeBanners() {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetHomePageBanners',

  })
}

export function GetHomeBrands() {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetHomePageBrands',

  })
}


export function GetHomeProduct() {
  return context.$axios({
    method: 'GET',
    url: '/Product/Product/GetHomePageProducts',

  })
}

