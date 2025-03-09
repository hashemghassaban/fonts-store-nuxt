import axios from 'axios'

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
      return Promise.reject(error)
    }
  )
  api.interceptors.response.use(
    response => response,
    error => {
      console.log(error.response?.data?.error)
      if (!error.response) {
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }
  )

  return api
}

export const apiService = createApiService()
