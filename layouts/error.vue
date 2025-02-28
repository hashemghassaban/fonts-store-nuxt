<template>
  <div>
    <Error404 v-if="error.statusCode === 404" />
    <Error500 v-if="error.statusCode === 500" />
  </div>
</template>

<script>
import Error404 from './errors/Error404'
import Error500 from './errors/Error500'
export default {
  name: 'ErrorLayout',
  props: ['error'],
  layout: 'empty', // you can set a custom layout for the error page
  components: {
    Error404,
    Error500,
  },
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
