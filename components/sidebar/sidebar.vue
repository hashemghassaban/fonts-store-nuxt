<template>
  <div class="sidebar">
    <div class="profile-info">
      <div class="info-top">
        <div class="avatar-user">
          <SvgIcon
            name="user"
            color=#AAE73E
            size="30px"
            className="rounded-full"
          />
        </div>
        <v-btn density="default" class="add" > <v-icon>mdi-plus</v-icon></v-btn>
        <div class="name">
          هاشم قصابان
          <SvgIcon
            name="edit"
            color=#000
            size="25px"
            className="rounded-full"
          />
        </div>
      </div>

      <div class="list-info">
        <ul class="information">
          <li>
            <b>شماره تماس : </b>
            <span>+98 912 111 22 33</span>
          </li>
          <li>
            <b>ایمیل : </b>
            <span>
                         <SvgIcon
                           name="edit"
                           color=#000
                           size="25px"
                           className="rounded-full"
                         />
                    Ebrahimi@gmail.com   </span>
          </li>
        </ul>
      </div>

    </div>
    <v-card class="mx-auto sidebar-block mb-10" max-width="350">
      <v-list flat>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            @click="goToLink(item.link, true)"
            v-if="i < 5"
          >
            <v-list-item-icon>
              <v-icon size="10">mdi-checkbox-blank-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="mx-auto sidebar-block" max-width="350">
      <v-list flat>
        <v-list-item-group v-model="selectedItemPages" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            v-if="i > 4"
          >
            <v-list-item-icon>
              <v-icon size="10">mdi-checkbox-blank-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-btn
      class="showList mb-10"
      color="primary"
      @click="drawerPage = true"
      height="40px"
      width="40px"
      elevation="0"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="drawerPage"
      fixed
      temporary
      class="navigation"
      width="100%"
    >
      <div class="navigation-header">
        <v-btn icon color="#fff" @click="drawerPage = false" elevation="0">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span>لیست صفحات</span>
      </div>
      <div class="navigation-body">
        <v-list flat>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.link"
              v-if="i < 6"
            >
              <v-list-item-icon>
                <v-icon size="10">mdi-checkbox-blank-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider class="my-3"></v-divider>
        <v-list flat>
          <v-list-item-group v-model="selectedItemPages" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.link"
              v-if="i > 5"
            >
              <v-list-item-icon>
                <v-icon size="10">mdi-checkbox-blank-circle</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedItem: null,
    selectedItemPages: null,
    drawerPage: false,
    items: [
      // { text: 'پرسش های متداول', link: '/page/faq' },
      // { text: ' بازگرداندن کالا', link: '/page/returned' },
      { text: 'شرایط استفاده', link: '/page/term' },
      { text: ' حریم خصوصی', link: '/page/privacy' },
      // { text: "گزارش تخلف و باگ", link: "/page/bugReport" },
      { text: ' درباره آلاساز ', link: '/page/aboutUs' },
      { text: 'تماس با آلاساز', link: '/page/contactUs' },
      { text: 'راهنمای  خرید ازآلاساز', link: '/page/guid' },

      // { text: "فرصت های شغلی", link: "/page/careers" },
    ],
  }),
  props: {},

  methods: {
    goToLink(link, type) {
      this.$router.push(link)
      if (type) {
        this.selectedItemPages = null
      } else {
        this.selectedItem = null
      }
      this.drawerPage = false
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation {
  display: block;
  z-index: 100;
  @include breakpoint(medium) {
    display: none;
  }
}
.showList {
  display: block;
  @include breakpoint(medium) {
    display: none;
  }
}
.sidebar-block {
  border-radius: 10px;
  box-shadow: 0px 0px 7px -3px #000;
  display: none;
  @include breakpoint(medium) {
    display: block;
  }
  .v-list {
    background: #f5f5f5;
    padding: 0;
    overflow: hidden;
    .v-list-item__title {
      font-size: 14px;
    }
    .v-list-item__icon {
      margin: 19px 0;
      margin-left: 0 !important;
      min-width: 15px;
      color: #bfbfbf;
    }
  }
  .v-list-item {
    border-bottom: 1px solid #ccc;
    &:last-child {
      border: 0;
    }
  }

  .v-item {
    list-style: disc;
  }
  .v-item--active {
    background: #1a9520;
    color: #fff;
    .v-list-item__icon {
      color: #fff;
    }
  }
}
.navigation {
  &-header {
    padding: 10px 17px;
    background: #607d8b;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .v-btn__content .v-icon {
      color: #fff !important;

      &:after {
        color: #fff !important;
      }
    }

    span {
      font-size: 1rem;
    }
  }

  &-body {
    .v-expansion-panels {
      &:last-child {
        margin-bottom: 100px;
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
    .v-navigation-drawer {
      width: 100% !important;
    }

    .v-navigation-drawer__border {
      display: none;
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
    gap: 60px;
    position: relative;

  }
  .avatar-user{
    background: #626262;
    position: relative;
    min-width: 145px;
    height: 145px;
    border-radius: 100px;
    overflow: hidden;
    text-align: center;
    line-height: 145px;
    i{
      font-size: 68px !important;
      margin: 33px auto 0;
      display: block;
    }
  }
  .add{
    color: #000;
    position: absolute;
    width: 30px;
    height: 30px;
    background: #aae73e;
    font-size: 22px;
    text-align: center;
    padding: 0;
    min-width: 20px;
    border-radius: 50px;
    right: 112px;
    bottom: 12px;
    i{
      font-size: 22px!important;
      margin: 0!important;
    }
  }
  .name{
    display: flex;
    gap: 20px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    i{

      cursor: pointer;
      &:hover{
        color: #FF7A00;
        &:before{
          color: #FF7A00;
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
        font-size: 18px;
        color: #777777;
        margin: 0 0 10px;
        b{
          font-weight: 100;
        }
        span{
          direction: ltr;
          i{
            margin-right: 10px;
            cursor: pointer;
            &:hover{
              color: #FF7A00;
              &:before{
                color: #FF7A00;
              }
            }
          }
        }
      }
    }
  }
}
</style>
