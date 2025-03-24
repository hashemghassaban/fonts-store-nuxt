<template>
  <div class="loading-overwrite">
    <div class="loading-box">
      <img src="~/assets/img/logo/logo2.png" alt="logo">
      <v-progress-linear
        color="#FF7A00"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>


    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped lang="scss">
img{
  width: 160px;
  filter: invert(1) brightness(1000);
  z-index: 1000;
  position: relative;
  opacity: 1;
  margin: 0 0 25px;
  left: 14px;
}




.loader {
  display: inline-block;
  margin: 0 16px;
}
.loading {
  &-overwrite {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 58%);
    display: block;
    z-index: 1000;
    top: 0;
    right: 0;
  }
  &-box {
    position: fixed;
    width: 250px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    text-align: center;
  }

}
::v-deep{
  .v-progress-linear--reverse .v-progress-linear__buffer {
    background: #fff;
  }
}
</style>
