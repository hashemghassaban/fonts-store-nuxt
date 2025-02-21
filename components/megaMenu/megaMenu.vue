<template>
  <div>
    <div class="main-navbar">
      <div id="mainnav">
        <div
          class="toggle-nav"
          :class="leftSidebarVal ? 'toggle-button' : ''"
          @click="openmobilenav = true"
        >
          <i class="fa fa-bars sidebar-bar"></i>
        </div>
        <ul class="nav-menu" :class="{ opennav: openmobilenav }">
          <li class="back-btn">
            <div class="mobile-back text-right">
              <span @click="openmobilenav = false">بازگشت</span>
              <i class="fa fa-angle-right pl-2" aria-hidden="true"></i>
            </div>
          </li>
          <li
            v-for="(menuItem, index) in menuLink"
            :key="index"
            class="mega-menu"
          >
            <nuxt-link
              :to="
                '/categories/' +
                menuItem.number +
                '/' +
                menuItem.name.replaceAll(' ', '-')
              "
              class="nav-link"
            >
              <span v-on:mouseover="showImg(menuItem)">
                {{ menuItem.name }}</span
              >
              <span
                class="sub-arrow"
                v-if="menuItem.childrenCategories || true"
              ></span>
            </nuxt-link>

            <div
              class="mega-menu-container"
              :class="{ opensubmenu: isActive('portfolio') }"
              v-if="true"
            >
              <div class="block">
                <ul class="parent-link">
                  <li
                    v-for="(childrenItem, index) in menuItem.childrenCategories"
                    :key="index"
                  >
                    <nuxt-link
                      :to="
                        '/categories/' +
                        childrenItem.number +
                        '/' +
                        childrenItem.name.replaceAll(' ', '-')
                      "
                      class="parent-box"
                    >
                      <span v-on:mouseover="showImg(childrenItem)">
                        {{ childrenItem.name }}</span
                      >
                    </nuxt-link>
                    <ul class="child-parent-link">
                      <li
                        v-for="(item, i) in childrenItem.childrenCategories"
                        :key="i"
                      >
                        <nuxt-link
                          :to="
                            '/categories/' +
                            item.number +
                            '/' +
                            item.name.replaceAll(' ', '-')
                          "
                        >
                          <span v-on:mouseover="showImg(item)">
                            {{ item.name }}</span
                          >
                        </nuxt-link>

                        <ul class="child-link">
                          <li
                            v-for="(link, j) in item.childrenCategories"
                            :key="j"
                          >
                            <nuxt-link
                              :to="
                                '/categories/' +
                                link.number +
                                '/' +
                                link.name.replaceAll(' ', '-')
                              "
                              class="m-0 p-0"
                            >
                              <span v-on:mouseover="showImg(link)">
                                {{ link.name }}</span
                              >
                            </nuxt-link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="pic-menu" v-if="srcImg?.imagePath">
                <img
                  :src="
                    'https://cdn.alasaz.com/Files/' +
                     srcImg.imagePath +
                    '?width=250&height=180'
                  "
                  :alt="srcImg.name"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['leftSidebarVal', 'menuLink'],
  data() {
    return {
      openmobilenav: true,
      subnav: false,
      activeItem: 'home',
      activeChildItem: '',
      srcImg: '',
      activemegaChild: '',
      indexShowChild: null,
    }
  },
  mounted() {
    this.showSubMenu(0)
  },
  methods: {
    mobilenav() {
      this.openmobilenav = !this.openmobilenav
    },
    
    showImg: function (item) {
      this.srcImg = item

    },

    isActive(menuItem) {
      return this.activeItem === menuItem
    },
    setActive(menuItem) {
      if (this.activeItem === menuItem) {
        this.activeItem = ''
      } else {
        this.activeItem = menuItem
      }
    },
    showSubMenu(i) {
      this.indexShowChild = i
    },
    isActiveChild(menuChildItem) {
      return this.activeChildItem === menuChildItem
    },
    setActiveChild(menuChildItem) {
      if (this.activeChildItem === menuChildItem) {
        this.activeChildItem = ''
      } else {
        this.activeChildItem = menuChildItem
      }
    },
    isActivesubmega(megaChildItem) {
      return this.activemegaChild === megaChildItem
    },
    setCategory(item) {
      let url_string = window.location.href
      let arr = url_string.split('/')
      let paramId = arr[arr.length - 2]
      let id = paramId
      localStorage.setItem('_lastCategoryId', id)
      this.$router.push(
        '/categories/' + item.number + '/' + item.name.replaceAll(' ', '-')
      )
    },
    setActivesubmega(megaChildItem) {
      // this.setCategory(megaChildItem)

      if (this.activemegaChild === megaChildItem) {
        this.activemegaChild = ''
      } else {
        this.activemegaChild = megaChildItem
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle-nav {
  &.toggle-button {
    z-index: 1;
  }
}
</style>
