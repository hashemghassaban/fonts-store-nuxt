import axios from 'axios'
import Vue from 'vue'

const createApiService = () => {
  const api = axios.create({
    baseURL: process.env.SERVER_HOST,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => {
      Vue.$toast.error('خطا در درخواست به سرور')
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    response => {
      // نمایش پیام موفقیت برای درخواست‌های موفق

      return response
    },
    error => {
      const errorMessage = error.response?.data?.error || error.response?.data?.message  || 'خطای نامشخص'

      return Promise.reject(errorMessage)
    }
  )

  return api
}

export const apiService = createApiService()
