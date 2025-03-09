

export default async function (
  { app, $axios, $toast, error, store, req },
  inject
) {
  // Axios configuration
  $axios.onRequest((config) => {
    store.commit('setLoading', true)
  })

  $axios.onResponse((res) => {
    if (typeof res.config.msg === 'string') {
      try {
        $toast.success(res.config.msg)
      } catch (e) {}
    }

    if (res.status === 200) {
      store.commit('setLoading', false)
    }
    // return (res.data)
  })

  $axios.onError((e) => {


    // default response message or api response message
    // if (e.config.forceLogin && e.response && e.response.status === 401) {
    //   app.router.go(-1)
    //   store.commit('openLogin')
    // }
    // const message =
    //   (e.response && e.response.data.error) ||
    //   (e.response && e.response.data.message) ||
    //   (e.response && e.response.statusText)
    //
    // if (e.response && e.response.data.errors) {
    //   e.erros = e.response.data.errors
    // }
    //
    // const statusCode = parseInt(e.response && e.response.status)
    // if (e.config.toast === true) {
    //   try {
    //     if (typeof message === 'string') $toast.error(message)
    //     // else
    //   } catch (e) {}
    // }
    //
    // if (e.config.progress) {
    //   setTimeout(() => {
    //     store.commit('setLoading', false)
    //   }, 500)
    // }
    //
    // if (e.config.raise === true) {
    //   error({ statusCode, message })
    // }
  })

  $axios.interceptors.response.use(
    (response) => {
      $toast.success('ssssssss')
      return response.data.entity || response.data
    },
    (e) => Promise.reject(e)
  )

}

