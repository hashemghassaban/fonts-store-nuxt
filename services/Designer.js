import { apiService } from './api'

class DesignerService {

  async getDesigner() {
    try {
      const response = await apiService.get(`/api/v1/collections`)
      return response.data
    } catch (error) {
      this.$toast.error(error, {
        timeout: 4000,
      })
      throw error
    }
  }


}

export const designerService = new DesignerService()
