import { apiService } from './api'

class ProductService {
  async getProduct(id) {
    try {
      const response = await apiService.get(`/api/v1/products/${id}`)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async postProduct(body) {
    try {
      const response = await apiService.post('/api/v1/carts', body)
      return response.data.entity
    } catch (error) {
      throw error.response?.entity || error
    }
  }
  async likeProduct(id) {
    try {
      const response = await apiService.post('/api/v1/products/' + id + '/like')
      return response.data.entity
    } catch (error) {
      throw error.response?.entity || error
    }
  }

  async dislikeProduct(id) {
    try {
      const response = await apiService.post('/api/v1/products/' + id + '/dislike')
      return response.data.entity
    } catch (error) {
      throw error.response?.entity || error
    }
  }

  async removePro(id) {
    try {
      const response = await apiService.delete(`/api/v1/carts/items/${id}`)
      return response.data.entity
    } catch (error) {
      throw error.response?.entity || error
    }
  }
}

export const productService = new ProductService()
