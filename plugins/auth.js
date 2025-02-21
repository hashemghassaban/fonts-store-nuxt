export default async function ({
                                 $auth,
                                 $axios,
                               }) {
  try {
    const data = await $axios(
      {
        url: '/users/profile',
        method: 'get',
        toast: false
      }
    )
    await $auth.setUser(data)
  } catch (e) {
    if (e.response && (e.response.status === 403 || e.response.status === 401)) {
      if($auth.loggedIn)
        await $auth.logout()
    }
  }
}
