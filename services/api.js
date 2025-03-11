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
      // Add loading state management
      store.commit('SET_LOADING', true)
      return config
    },
    error => {
      store.commit('SET_LOADING', false)
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    response => {
      store.commit('SET_LOADING', false)
      return response
    },
    error => {
      store.commit('SET_LOADING', false)
      // Handle errors consistently
      const errorMessage = error.response?.data?.error ||
        error.message ||
        'An unknown error occurred'
      store.commit('SET_ERROR', errorMessage)

      return Promise.reject(error)
    }
  )

  return api
}
