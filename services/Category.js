import { apiService } from './api'

class CategoryService {

  async getCategory(id, data) {
    try {
      const response = await apiService.post(`/api/v1/products`, data)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async getCategoryPro(id) {
    try {
      const response = await apiService.get(`/api/v1/categories/${id}/products`)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }
  async getCategoryAll() {
    try {
      const response = await apiService.get(`/api/v1/categories`)
      return response.data
    } catch (error) {
      console.error('خطا در دریافت محصول:', error)
      throw error
    }
  }


}

export const categoryService = new CategoryService()
