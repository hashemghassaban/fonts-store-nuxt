import { apiService } from './api'

class HomeService {
  async getHome() {
    const response = await apiService.get('/api/v1/home/web')
    return response.data
  }
  async newsLetter(body) {
    const response = await apiService.post('/api/v1/users/newsletters' , body)
    return response.data
  }

}

export const homeService = new HomeService()
