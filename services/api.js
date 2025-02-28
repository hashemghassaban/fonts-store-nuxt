import axios from 'axios'

const createApiService = () => {
  const api = axios.create({
    baseURL: process.env.SERVER_HOST,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return api
}

export const apiService = createApiService()
