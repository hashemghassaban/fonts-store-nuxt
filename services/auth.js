import { apiService } from './api'

class AuthService {
  async login(credentials) {
    try {
      const response = await apiService.post('/api/v1/auth/login', credentials)
      return response.data
    } catch (error) {
      throw error
    }
  }

  async sendSMS(credentials) {
    try {
      const response =  await apiService.post('/api/v1/auth/verify', credentials)
      return response.data
    } catch (error) {
      localStorage.removeItem('token')
      throw error
    }
  }
  async logout() {
    try {
      await apiService.post('/auth/logout')
      localStorage.removeItem('token')
      return response.data
    } catch (error) {
      throw error
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      const response = await apiService.get('/auth/me')
      return response.data
    } catch (error) {
      localStorage.removeItem('token')
      throw error
    }
  }
  // افزودن متد جدید برای نمایش پیام‌های سفارشی
  static showToast(message, type = 'success') {
    Vue.$toast[type](message)
  }
}

export const authService = new AuthService()
