export default function ({ redirect }) {
  if (process.client) {
    if (!!window.localStorage.getItem('token')) {
      return
    }
  }
}
