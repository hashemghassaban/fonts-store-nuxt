<template>
  <v-app dark>
    <div class="container custom-404">
      <div class="search">
        <div class="search-wrapper">
          <div class="search-help-text">
            <img src="~/assets/img/icon/404.jpg" alt="404" />

            <h4>صفحه مورد نظر یافت نشد</h4>
            <p>ما اینجا هستیم تا به شما کمک کنیم</p>

              <button @click="goHome()" class="goHome" color="#fff"> <SvgIcon
                name="arrow"
                color="#fff"
                size="16px"
                className="rounded-full"
              /> بازگشت به صفحه اصلی  </button>


          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  components: {
    SvgIcon,
  },
  data() {
    return {
      search: null,
      selectSearch: null,
      loading: false,
      states: [],
      items: [],
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head: {
    titleTemplate: "%s -فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی",
    title: "صفحه یافت نشد",
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "صفحه یافت نشد - فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی",
    },
  ],

  methods: {

    goHome() {
      this.$router.push("/");
    },


  },
};
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
.search-help-text {
  width: 100%;
}
.search-help-text h4 {
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
}
.search-help-text p {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
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
</style>
