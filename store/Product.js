import * as ProductHttp from '../services/Product'

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
  GetProducts(context, data) {
    return ProductHttp.GetProducts(data)
  },
  GetProductsShortData(context, data) {
    return ProductHttp.GetProductsShortData(data)
  },
  GetProductDetails(context, data) {
    return ProductHttp.GetProductDetails(data)
  },
  GetCategoryList(context, state) {
    return ProductHttp.GetCategoryList()
  },
  GetCategoryProducts(context, data) {
    return ProductHttp.GetCategoryProducts(data)
  },
  GetBrandProducts(context, data) {
    return ProductHttp.GetBrandProducts(data)
  },
  GetWarrantyProducts(context, data) {
    return ProductHttp.GetWarrantyProducts(data)
  },
}
