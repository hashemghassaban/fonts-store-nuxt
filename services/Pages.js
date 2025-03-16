import { apiService } from './api'

class PagesService {
  async getFaq() {
    try {
      const response = await apiService.get('/api/v1/faq')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async getSubPage() {
    try {
      const response = await apiService.get('/api/v1/pages/sup')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async getPage(name) {
    try {
      const response = await apiService.get(`/api/v1/pages/${name}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }

  async getAboutPage() {
    try {
      const response = await apiService.get('/api/v1/pages/about-us')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
  async getCaptcha() {
    try {
      const response = await apiService.get('/api/v1/captcha/api/math')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }


  async getWorkPage() {
    try {
      const response = await apiService.get('/api/v1/pages/work-us')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }


  async postContactUs(data) {
    try {
      const response = await apiService.post('/api/v1/contact-us',data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
}

export const pagesService = new PagesService()
