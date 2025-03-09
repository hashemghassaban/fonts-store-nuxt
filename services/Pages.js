import { apiService } from './api'

class PagesService {
  async getFaq() {
    const response = await apiService.get('api/v1/faq')
    return response.data
  }

  async getSubPage() {
    const response = await apiService.get('api/v1/pages/sup')
    return response.data
  }

  async getAboutPage() {
    const response = await apiService.get('api/v1/pages/about-us')
    return response.data
  }


  async getWorkPage() {
    const response = await apiService.get('api/v1/pages/work-us')
    return response.data
  }


  async postContactUs() {
    const response = await apiService.get('api/v1/contact-us')
    return response.data
  }
}

export const pagesService = new PagesService()
