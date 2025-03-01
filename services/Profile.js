import { apiService } from './api'

class ProfileService {
  async getWallets(id) {
    try {
      const response = await apiService.get(`/api/v1/users/transactions/wallet`)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async getOrders(Param) {
    try {
      const response = await apiService.get(`/api/v1/users/orders`,Param)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async getFavourites() {
    try {
      const response = await apiService.get(`/api/v1/users/favourites`)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async saveProfile(data) {
    try {
      const response = await apiService.post(`/api/v1/users/profile` , data)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
}

export const profileService = new ProfileService()
