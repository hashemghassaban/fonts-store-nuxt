import { apiService } from './api'

class DesignerService {

  async getDesigner() {
    try {
      const response = await apiService.get(`/api/v1/collections`)
      return response.data
    } catch (error) {
      throw error
    }
  }


}

export const designerService = new DesignerService()
