<template>
  <div class="sidebar">
    <Loading v-if="loading" />
    <div class="profile-info" :class="{ isShow: !this.isMain }">
      <div class="info-top"  >

        <v-btn density="default" class="add" v-if="false"  @click="triggerUpload" > <v-icon>mdi-plus</v-icon></v-btn>


        <div class="name">
          <nuxt-link to="/page/userManager">

            <v-skeleton-loader type="image" class="elevation-0" v-if="loading"></v-skeleton-loader>

         <span v-else>{{(this.profile.full_name !== " "  || this.profile.full_name !== null) ?  this.profile.full_name : 'نام کاربری'}}</span>
          <SvgIcon
            name="edit"
            color=#000
            size="25px"
            className="rounded-full"
          />
          </nuxt-link>
        </div>
      </div>

      <div class="list-info" >
        <ul class="information">
          <li>
            <b>شماره تماس : </b>
            <v-skeleton-loader type="image" class="elevation-0" v-if="loading"></v-skeleton-loader>
            <span v-else>{{this.profile.mobile}}</span>
          </li>
          <li>
            <b>موجودی کیف پول : </b>
            <v-skeleton-loader type="image" class="elevation-0"  v-if="loading"></v-skeleton-loader>
            <span  v-else>{{formatPrice(this.profile.credit)}}   ت  </span>
          </li>

        </ul>
      </div>


    </div>
    <v-card class="mx-auto sidebar-block mb-10" max-width="100%"  :class="{ isShow: !this.isMain }">
      <v-list flat>
        <v-list-item-group  color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            v-if="i < 5"
            @click="menuActionClick(item.action)"

          >
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
              <v-icon>mdi-chevron-left</v-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-btn
      class="showList"
      color="primary"
      icon
      @click="goToPage()"
      :class="{ isShow: this.isMain }"
    >

      <v-icon>mdi-arrow-right</v-icon>
      بازگشت به پنل کاربری
    </v-btn>

  </div>
</template>

<script>
import { profileService  } from '~/services'

export default {
  props: {
    isMain: {
      type: Boolean,
      default:false,
    },
    isCallService: {
      type: Boolean,
      default:false,
    },
  },

  data: () => ({
    drawerPage: false,
    avatarUrl: null,
    profile:'',
    loading:false,
    isVisible: false,
    isMobile: false,
    windowWidth: 0,
    url:'',
    items: [
      { text: 'داشبورد', link: '/page/userManager' , action:''},
      { text: 'سفارش ها', link: '/page/order' , action:''},
      { text: 'کیف پول من', link: '/page/wallet' , action:''},
      { text: 'فونت های مورد علاقه', link: '/page/favorite', action:'' },
      { text: 'خروج', link: '', action:'logout' },
    ],
  }),

  created() {
    this.getProfile()
  },
  watch: {
    avatarUrl(newValue) {
      this.$emit('avatarUrl', newValue);
      if (newValue) {
        return newValue
      }
    },
    isCallService(newValue){
      if(newValue){
        this.getProfile()
      }

    }
  },
  methods: {
    goToPage(){
      this.$router.push('/page/userManager')
    },
    async getProfile() {
      this.loading = false
      try {
        let res = await profileService.getProfile()
        this.profile = res.entity
        this.avatarUrl = res.entity?.avatar_url
        this.loading = false
        this.$emit('profile', this.profile);
        this.$emit('avatarUrl', this.avatarUrl);

      } catch (error) {
        this.loading = false

        this.$toast.error(error, {
          timeout: 4000,
        })
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click()
    },
    checkMobile() {
      // در موبایل اگر عرض صفحه کمتر از 768 پیکسل باشد
      this.isMobile = window.innerWidth < 768
      if( !this.isMobile){
        this.isVisible = true
      }
    },
    handleFileSelect(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        this.avatarUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    menuActionClick(action) {
      if (action === "logout") {
        window.localStorage.removeItem('token');
        window.location.replace( '/')
      }
    },
    formatPrice(value) {
      if(isNaN(value)) return  0
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    toggleSize() {
      // برای تست، عرض صفحه را تغییر می‌دهیم
      this.windowWidth = this.isMobile ? 1024 : 320
      this.checkMobile()
    }
  },
  mounted() {
    this.url = this.$router?.history?.current?.path
    this.checkMobile()
    // در هنگام تغییر اندازه پنجره هم بررسی می‌کنیم
    window.addEventListener('resize', this.checkMobile)

  },
  beforeDestroy() {
    // پاک کردن event listener
    window.removeEventListener('resize', this.checkMobile)
  }
}
</script>

<style lang="scss" scoped>
.isShow{
  display: none;
  @include breakpoint(medium) {
    display: block;
  }
}
.navigation {
  display: block;
  z-index: 100;
  @include breakpoint(medium) {
    display: none;
  }
}
.showList  {
  width: auto!important;
  max-height:50px!important;
  padding: 0 10px;
   border-radius: 5px!important;
  border: 1px solid;
  margin: 0 0 25px;
  @include breakpoint(medium) {
    display: none!important;
  }
  ::v-deep{
    .v-btn__content{
      gap: 10px;
      i{
        margin: 0!important;
      }
    }
  }

}
.sidebar-block {
  border: 0;
  box-shadow: none!important;


  .v-list {
    background: #fff;
    padding: 0;
    .v-list-item__title {
      font-size: 15px;
      font-weight: 700;
      @include breakpoint(small) {
        font-size: 18px;
      }
    }
    i {
      position: absolute;
      left: 0;
      top:10px;
      color: #C2C2C2;
      font-size: 30px;
    }
  }

.v-list-item{
  padding: 0;
  margin: 0 0 20px;
}


  .v-item--active {
    color: #F15A24;

    .v-list-item__title{
      color: #F15A24;
      &:before{
        width: 4px;
        height: 34px;
        background: #F15A24;
        content: "";
        position: absolute;
        right: -32px;
        top: 9px;
      }
    }

  }
}

.profile {
  padding: 0 6%;
  gap: 1%;
  flex-direction: column;
  display: flex;

  @include breakpoint(medium) {
    flex-direction: row;
  }
  @include breakpoint(xultra) {
    padding: 0 16%;
  }

  &-panel {
    flex: 25%;
    max-width: 25%;
    display: none;

    @include breakpoint(medium) {
      display: block;
    }

    &-show-mobile {
      display: block;

      @include breakpoint(medium) {
        display: none;
      }

      span {
        color: #fff;
      }
    }
  }

  .show-mobile-nav {
    z-index: 1000;
    display: block;
    padding: 0 0;
    width: 100%;
    margin: auto;
    border: 0;

    @include breakpoint(medium) {
      display: none;
    }
  }

  ::v-deep {
    .v-item--active {
      .v-list-item__title {
        font-weight: 900;
      }
    }


    .v-list-item--link:before {
      background-color: inherit !important;
    }
    .v-list-item {
      &__subtitle {
        padding: 5px 0 0;
      }
    }

    .v-list-item--active {
      background-color: inherit !important;

      &:before {
        content: '';
        background-color: #1a9520 !important;
        width: 3px;
        height: 100%;
        right: -8px;
        opacity: 1;
      }
    }
  }

  &-content {
    flex: 100%;
    max-width: 100%;

    @include breakpoint(medium) {
      flex: 75%;
      max-width: 79%;
    }

    .d-block {
      span {
        font-size: 0.8rem;
        color: rgb(26 149 32) !important;
        a{
          color: #FF9800;
          font-weight: 600;
          padding: 3px 5px;
        }
      }

      i {
        color: rgb(26 149 32) !important;
      }
    }

    .content {
      padding: 25px 20px;
    }
  }
}

.userName {
  font-family: 'IRANYekanBold' !important;
  font-size: 0.8rem !important;
  margin: 0 0 6px;
}

.phone-number {
  font-size: 0.75rem !important;
  margin: 4px 0 0;
}

.edit {
  position: absolute;
  left: 20px;
  top: 20px;
  color: rgb(26 149 32) !important;
}

.silver {
  background: #f5f5f5;

  .userName {
    font-size: 14px !important;
    margin: 0;
  }
}
.profile-info{

  .info-top{
    display: flex;
    align-items: center;
    gap: 15px;
    position: relative;
    @include breakpoint(small) {
      gap: 25px;
    }
  }
  .avatar-user{
    background: #626262;
    position: relative;
    min-width: 80px;
    width: 80px;
    max-width: 80px;
    height: 80px;
    border-radius: 100px;
    overflow: hidden;
    text-align: center;
    line-height: 80px;
    border: 2px solid #626262;
    @include breakpoint(small) {
      line-height: 145px;
      min-width: 145px;
      max-width: 145px;
      height: 145px;
    }
    i{
      font-size: 30px !important;
      margin: 25px auto 0;
      display: block;
      line-height: 30px;
      @include breakpoint(small) {
        font-size: 68px !important;
        line-height: 100px;
        margin: 20px auto 0;

      }
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .add{
    color: #000;
    position: absolute;
    width: 25px;
    height: 25px;
    background: #aae73e;
    font-size: 22px;
    text-align: center;
    padding: 0;
    min-width: 20px;
    border-radius: 50px;
    right: 58px;
    bottom: 6px;
    @include breakpoint(small) {
      right: 112px;
      bottom: 12px;
      width: 30px;
      height: 30px;
    }
    i{
      font-size: 22px!important;
      margin: 0!important;
    }
  }
  .name{

    font-size: 22px;
    font-weight: 700;
    width: 100%;
    a{
      display: flex;
      align-items: center;
      font-size: 18px;
      gap: 20px;
      justify-content: space-between;
      width: 100%;
      @include breakpoint(small) {
        font-size: 23px;
      }
      &.nuxt-link-active{
        i{
          color:#ff5722!important;
        }
      }
    }
    i{
      transition: all 0.3s ease;

      cursor: pointer;
      &:hover{
        color: #FF7A00;
        transition: all 0.3s ease;

        &:before{
          color: #FF7A00;
          transition: all 0.3s ease;

        }
      }
    }
  }
  .list-info{
    padding: 40px 0;
    line-height: 40px;
    width: 100%;
    ul{
      width: 100%;
      li{
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        color: #777777;
        margin: 0 0 10px;
        @include breakpoint(small) {
          font-size: 18px;
        }
        b{
          font-weight: 100;
        }
        span{
          i{
            margin-right: 10px;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover{
              color: #FF7A00;
              transition: all 0.3s ease;

              &:before{
                color: #FF7A00;
                transition: all 0.3s ease;

              }
            }
          }
        }
      }
    }
  }
}
.v-skeleton-loader{
     width: 200px;
     height: 35px;
   }


</style>
