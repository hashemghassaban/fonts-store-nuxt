import { apiService } from './api'

class PagesService {
  async getFaq() {
    const response = await apiService.get('/api/v1/faq')
    return response.data
  }

  async getSubPage() {
    const response = await apiService.get('/api/v1/pages/sup')
    return response.data
  }

  async getAboutPage() {
    const response = await apiService.get('/api/v1/pages/about-us')
    return response.data
  }
  async getCaptcha() {
    const response = await apiService.get('/api/v1/captcha/api/math')
    return response.data
  }


  async getWorkPage() {
    const response = await apiService.get('/api/v1/pages/work-us')
    return response.data
  }


  async postContactUs(data) {
    const response = await apiService.post('/api/v1/contact-us',data)
    return response.data
  }
}

export const pagesService = new PagesService()
