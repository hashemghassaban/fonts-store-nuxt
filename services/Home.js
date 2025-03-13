import { apiService } from './api'

class HomeService {
  async getHome() {
    try {
      const response = await apiService.get('/api/v1/home/web')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
  async newsLetter(body) {
    try {
      const response = await apiService.post('/api/v1/users/newsletters' , body)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

}

export const homeService = new HomeService()
