import { apiService } from './api'

class CartService {
  async getCart() {
    try {
      const response = await apiService.get('/api/v1/layout/web')
      return response.data
    } catch (error) {
      throw error
    }
  }
  async getCheckOut() {
    try {
      const response = await apiService.get('/api/v1/carts/checkout')
      return response.data
    } catch (error) {
      throw error
    }
  }
  async saveCheckoutDetail(body) {
    try {
      const response = await apiService.post('/api/v1/carts/checkout', body)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async applyCoupon(body) {
    try {
      const response = await apiService.post('/api/v1/coupons/apply', body)
      return response.data
    } catch (error) {
      throw error
    }
  }






}

export const cartService = new CartService()
