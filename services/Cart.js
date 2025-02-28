import { apiService } from './api'

class CartService {
  async getCart() {
    const response = await apiService.get('api/v1/layout/web')
    return response.data
  }
  async getCheckOut() {
    const response = await apiService.get('api/v1/carts/checkout')
    return response.data
  }
  async saveCheckoutDetail(body) {
    const response = await apiService.post('api/v1/carts/checkout', body)
    return response.data
  }



}

export const cartService = new CartService()
