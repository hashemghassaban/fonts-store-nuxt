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
          <li  class="mega-menu">
            <a href="#" class="nav-link">

              <span > دسته بندی ها</span>
            </a>

            <div class="mega-menu-container" >
              <div class="block">
               <div v-for="(items, d) in menuLink" :key="d"  class="box">
                 <nuxt-link :to="'/categories/'+items.id" class="title" >
                   <img :src="getImgUrl(titleBlock[d].pic)" :alt="items?.name" />
                   <span>{{items?.name}}</span>
                 </nuxt-link>
                <ul class="parent-link" >
                  <li v-for="(childrenItem, index) in items.children" :key="index">
                    <nuxt-link :to="'/categories/'+childrenItem.id" class="parent-box">{{ childrenItem?.name }}</nuxt-link>
                  </li>
                  <li v-if="items.children > 5">
                    <nuxt-link
                      :to="'/categories/'+items.id"
                      class="nav-link">
                      <SvgIcon
                        name="arrow"
                        color="#AAE73E"
                        size="15px"
                        className="rounded-full"
                      />
                      <span>
                همه
               </span
               >

                    </nuxt-link>
                  </li>
                </ul>

               </div>
              </div>
            </div>
          </li>
          <li


            class="mega-menu"
          >
            <nuxt-link
              :to="
                '/designer'

              "
              class="nav-link"
            >
              <span>
                طراحان
               </span
               >

            </nuxt-link>
          </li>
          <li  class="mega-menu">
            <a href="#" class="nav-link">

              <span >  تخفیف ها</span>
            </a>

            <div class="mega-menu-container promotions" >
              <div class="block">
                <div   class="box">
                  <ul class="parent-link" >
                    <li v-for="(items, d) in promotions" :key="d"  class="box">
                     <nuxt-link :to="'/promotions/'+items.id">{{items?.title}}</nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

          <li class="mega-menu" >
            <nuxt-link
              :to="
                '/blog'
              "
              class="nav-link">
              <span>
                لاینومگ
               </span
              >

            </nuxt-link>
          </li>

          <li

            class="mega-menu"
          >
            <nuxt-link
              :to="
                '/contact'

              "
              class="nav-link"
            >
              <span>
                تماس با ما
               </span>

            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  props: ['leftSidebarVal', 'menuLink' , 'promotions'],
  data() {
    return {
      openmobilenav: true,
      subnav: false,
      activeItem: 'home',
      activeChildItem: '',
      srcImg: '',
      activemegaChild: '',
      enamad:[],
      // indexShowChild: null,
      titleBlock:[
        {name:'کالیگرافی',pic:'box01'},
        {name:'هندسی',pic:'box02'},
        {name:'دست‌نویس',pic:'box03'},
        {name:'نمایشی',pic:'box04'},
      ]
    }
  },

  methods: {

    getImgUrl(pet) {
      var images = require.context('~/assets/img/element/', false, /\.png$/)
      return images('./' + pet + '.png')
    },
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
.mega-menu-container{
  .block{
    display: flex;
    flex-wrap: wrap;

      .parent-link{
        flex: 25%;
        max-width: 25%;
        li{
          &:last-child{
            position: absolute;
            bottom: 30px;
            a{
              &:hover{
                color: #ff5722!important;

              }
            }

          }
        }
        a{
          color: #A1A1A1!important;
          font-size: 20px!important;

        }
      }


  }
}
</style>
