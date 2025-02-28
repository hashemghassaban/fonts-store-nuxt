<template>
  <v-app dark>
    <div class="container custom-404">
      <div class="search">
        <div class="search-wrapper">
          <div class="search-help-text">
            <img src="~/assets/img/icon/500.jpg" alt="500" />

            <h4>در پردازش اطلاعات خطایی رخ داده است</h4>

            <button @click="goHome()" class="goHome"
            > <SvgIcon
              name="arrow"
              color="#fff"
              size="16px"
              className="rounded-full"
            /> بازگشت به صفحه اصلی  </button>          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  methods: {

    goHome() {
      this.$router.push("/");
    },


  },
  head: {
    titleTemplate: "%s -فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی",
    title: "صفحه یافت نشد",
  },
}
</script>

<style scoped lang="scss">


.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
a {
  color: #1b9520;
  text-decoration: none;
}
.custom-404 {
  display: flex;
  justify-content: center;
}

.search {
  color: #4d4d4d;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  float: left;
  flex-wrap: wrap;
  padding: 40px 30px;
}
.search img {
  margin: 0 auto 50px auto;
  display: table;
  width: 300px;
}
.search-help-text{
  text-align: center;
}
::v-deep{
  .back {
  display: inline-block;
  height: 45px!important;
    padding: 10px 16px!important;
  border-radius: 10px!important;

  span{
    color: #fff !important;
  }
}
}
.goHome {
  border: 2px solid #AAE73E;
  background: #AAE73E;
  border-radius: 10px;
  text-align: center;
  width: 245px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  color: #fff;
  margin: auto;

  &:hover{
    background: #000;
    border: 2px solid #000;

    transition: all 0.3s ease;


  }

  i{
    margin-left: 5px;
  }
}

.search-help-text h4 {
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
