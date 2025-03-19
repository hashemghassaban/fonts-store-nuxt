import { apiService } from './api'

class ProductService {
  async getProductAll( data) {
    try {
      const response = await apiService.post(`/api/v1/products`,data)
      return response.data
    } catch (error) {
      throw error
    }
  }
  async getPromotion(id , body) {
    try {
      const response = await apiService.post(`/api/v1/promotions/${id}`, body)
      return response.data
    } catch (error) {
      throw error
    }
  }
  async getProduct(id) {
    try {
      const response = await apiService.get(`/api/v1/products/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
  async download(orderItemId) {
    try {
      const response = await apiService.get(`/api/v1/users/download/${orderItemId}`)
      return response.data
    } catch (error) {
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
