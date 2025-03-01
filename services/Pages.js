import { apiService } from './api'

class PagesService {
  async getFaq() {
    const response = await apiService.get('api/v1/faq')
    return response.data
  }

  async postContactUs() {
    const response = await apiService.get('api/v1/contact-us')
    return response.data
  }
}

export const pagesService = new PagesService()
