
import { apiService } from './api'

class PostService {
  async getPost(data) {
    try {
      const response = await apiService.get('/api/v1/posts',{
        params: data
      })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
  async getPostDetail(id) {
    try {
      const response = await apiService.get(`/api/v1/posts/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
  async postRate(id , data) {
    try {
      const response = await apiService.post(`/api/v1/posts/${id}/rate`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }
  async postComment(id , data) {
    try {
      const response = await apiService.post(`/api/v1/posts/${id}/comments`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }

  }
  async getComment(id) {
    try {
      const response = await apiService.get('/api/v1/posts/' + id + '/comments')
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  }


}

export const postService = new PostService()
