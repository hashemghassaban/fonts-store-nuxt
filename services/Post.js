
import { apiService } from './api'

class PostService {
  async getPost() {
    const response = await apiService.get('api/v1/posts')
    return response.data
  }


}

export const postService = new PostService()
