export default function setState() {
  return (store) => {
    store.subscribe((mutation, state) => {
      const {
        type,
        payload
      } = mutation
      if (!!type && type.includes('/setState')) {
        let modoule = type.split('/')[0]
        if (payload !== undefined) {
          Object.keys(payload).map((key) => {
            state[modoule][key] = payload[key]
          })

        } else {
          state = payload
        }
      }
    })
  }
}
