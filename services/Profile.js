import { apiService } from './api'

class ProfileService {
  async getProfile() {
    try {
      const response = await apiService.get(`/api/v1/users/profile`)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async getWallets(id) {
    try {
      const response = await apiService.get(`/api/v1/users/transactions/wallet`)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async getPaymentGateway(id) {
    try {
      const response = await apiService.get(`/api/v1/users/transactions/payment-gateways`)
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
  async getOrderId(id) {
    try {
      const response = await apiService.get(`/api/v1/users/orders/${id}`)
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
      const response = await apiService.post(`/api/v1/users/profile` , data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }

  async chargeWallet(data) {
    try {
      const response = await apiService.post(`/api/v1/users/transactions/wallet` , data);
      return response.data
    } catch (error) {
      this.$toast.error('خطا در دریافت محصول:', error, {
        timeout: 4000,
      })
      throw error
    }
  }

}

export const profileService = new ProfileService()
