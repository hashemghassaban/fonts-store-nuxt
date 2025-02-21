// Load Services

import store from '@/store/index.js'
export default async function ({ app, $axios, $toast, error, store }) {
  let refreshAttempts = 0;
  // Axios configuration
  $axios.onRequest((config) => {
    if (config.progress) {
      store.commit('setLoading', true)
    }
  })

  $axios.onResponse((res) => {
    if (typeof res.config.msg === 'string') {
      try {
        $toast.success(res.config.msg)
      } catch (e) {}
    }
    if (res.config.progress) {
      setTimeout(() => {
        store.commit('setLoading', false)
      }, 500)
    }
  })

  $axios.onError((e) => {
    
    if (e.response.status === 401) {
      let tokenString = process.client ? localStorage.getItem('token') : '';
      let newTokenString =  tokenString.slice (7)
        refreshAttempts++;
        if (refreshAttempts > 3) {
         store.commit('LOGOUT')
        return Promise.reject(error);
        }
       else {
        let param = {
          'refreshToken': newTokenString,
        }
      store.dispatch('Account/RefreshToken', param, {
        headers: {
          Authorization: 'bearer' + !!window.localStorage.getItem('token'),
        },
      })
    
    }
      const message =
        (e.response && e.response.data.error) ||
        (e.response && e.response.data.message) ||
        (e.response && e.response.statusText)

      if (e.response && e.response.data.errors) {
        e.erros = e.response.data.errors
      }

      const statusCode = parseInt(e.response && e.response.status)
      if (e.config.toast === true) {
        try {
          if (typeof message === 'string') $toast.error(message)
          // else
        } catch (e) {}
      }

      if (e.config.progress) {
        setTimeout(() => {
          store.commit('setLoading', false)
        }, 500)
      }

      if (e.config.raise === true) {
        error({ statusCode, message })
      }
    }
  })

  $axios.interceptors.response.use(
    (response) => {
      return response?.data?.entity || response?.data
    },
    (e) => Promise.reject(e)
  )

  // dynamic service generation
}
