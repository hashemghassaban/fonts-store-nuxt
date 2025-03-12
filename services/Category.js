import { apiService } from './api'

class CategoryService {

  async getCategory(id, data) {
    try {
      const response = await apiService.post(`/api/v1/products`, data)
      return response.data
    } catch (error) {
      this.$toast.error(error, {
        timeout: 4000,
      })
      throw error
    }
  }
  async getCategoryPro(id ,  data) {
    try {
      const response = await apiService.get(`/api/v1/categories/${id}/products`,data)
      return response.data
    } catch (error) {
      this.$toast.error(error, {
        timeout: 4000,
      })
      throw error
    }
  }
  async getCategoryAll() {
    try {
      const response = await apiService.get(`/api/v1/categories`)
      return response.data
    } catch (error) {
      this.$toast.error(error, {
        timeout: 4000,
      })
      throw error
    }
  }
  async getCategorySingle(id) {
    try {
      const response = await apiService.post(`/api/v1/categories/${id}`)
      return response.data
    } catch (error) {
      this.$toast.error(error, {
        timeout: 4000,
      })
      throw error
    }
  }


}

export const categoryService = new CategoryService()
