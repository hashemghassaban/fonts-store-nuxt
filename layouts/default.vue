<template>
  <v-app>
    <v-main id="top" class="">
      <TheHeader class="headerBox" />
      <Nuxt class="onContent" />
      <TheFooter />
    </v-main>
    <transition name="fade">
      <client-only>
        <Loading v-if="loading" />
      </client-only>
    </transition>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

const TheHeader = () => import("../components/TheHeader/TheHeader.component.vue");
const TheFooter = () => import("../components/TheFooter/TheFooter.component.vue");
const Loading = () => import("../components/loading.vue");

export default {
  components: {
    TheHeader,
    TheFooter,
    Loading
  },

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  head() {
    return {
      link: [{
        hid: 'canonical',
        rel: 'canonical',
        href: `https://linotyper.com${this.$route.path}`
      }]
    }
  },
  data() {
    return {

      text: "برای نصب اپ آلاساز کلیک کنید",
      vertical: true,
      timeoutPwa: 15000,
      deferredPrompt: null,
    };
  },

  computed: {
    loading() {
      return this.$store.state.loading
    },
  },

};
</script>
<style lang="scss" scoped>
.v-main {
  padding: 0 !important;
  transition-duration: 0.5s;
  &.blur {
    filter: blur(10px);
    transition-duration: 0.5s;
  }
}
.headerBox {
  position: fixed !important;
  top: 0;
  z-index: 10;
  right: 0;
  width: 100%;
  background-color: #fff !important;
  &.onScroll {
    display: block;
    box-shadow: 0px 0px 10px -3px #000 !important;
    ::v-deep {
      .v-toolbar__content {
        border: 0 !important;
        margin: 0;
        padding: 0;
      }
    }
    .search-header {
      margin: 0 !important;

    }
  }
}

.onContent {
  transition-duration: 0.5s;
  margin-top: 120px;


}
.gotoUp {
  position: fixed;
  right: 5%;
  bottom: 2%;
  width: 48px;
  height: 48px;
  padding: 9px 12px;
  z-index: 10;
  border-radius: 30px !important;
  background-color: #1a9520;
  cursor: pointer;
  box-shadow: 0px 0px 6px -3px #000;
  transition-duration: 0.5s;
  opacity: 0;

  .v-icon {
    color: #fff;
    width: 100%;
    font-size: 25px;
  }
  &.active {
    opacity: 1;
    transition-duration: 0.5s;
  }
}
.messager {
  position: fixed;
  left: 5%;
  bottom: 2%;
  width: 55px;
  height: 55px;
  padding: 16px 8px;
  z-index: 10;
  border-radius: 30px !important;
  background-color: #607d8b;
  cursor: pointer;
  box-shadow: 0px 0px 6px -3px #000;
  transition-duration: 0.5s;


  .socialListItem {
    opacity: 0;
    transition: all 0.3s ease;

    li {
      a {
        img {
          width: 32px;
          height: 32px;
          background: #fff;
          border-radius: 10px;
          margin: 15px 3px 5px;
          padding: 5px;
          overflow: hidden;
        }
      }
    }
  }
  &:hover {
    height: 264px;
    transition: all 0.3s ease;

    .socialListItem {
      transition: all 0.3s ease;

    }
  }
  .v-icon {
    color: #fff;
    width: 100%;
    font-size: 25px;
  }
}
.v-snack__content {
  width: 100%;
}
.install-app {
  display: flex;
  align-items: center;
  .logo {
    border-radius: 50px;
    overflow: hidden;
    border: 1px solid #ccc;
    margin-left: 5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p {
    margin-top: 10px;
  }
}
</style>
