
import { apiService } from './api'

class PostService {
  async getPost(data) {
    const response = await apiService.get('/api/v1/posts',{
      params: data
    })
    return response.data
  }
  async getPostDetail(id) {
    const response = await apiService.get(`/api/v1/posts/${id}`)
    return response.data
  }
  async postRate(id , data) {
    const response = await apiService.post(`/api/v1/posts/${id}/rate`, data)
    return response.data
  }
  async postComment(id , data) {
    const response = await apiService.post(`/api/v1/posts/${id}/comments`, data)
    return response.data
  }
  async getComment(id) {
    const response = await apiService.get(`/api/v1/posts/${id}/comments`)
    return response.data
  }


}

export const postService = new PostService()
