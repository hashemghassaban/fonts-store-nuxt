<template>
    <v-app-bar :elevation="2" class="header">
      <nav class="navbar">
        <!-- Brand Section -->

        <div class="navbar-brand"><nuxt-link to="/"><img src="~/assets/img/logo/logo.png"/></nuxt-link></div>

        <!-- Navigation Links -->
        <div class="navbar-links">

          <Nav-bar :menuLink="this.menuItems"  :promotions="this.promotions"/>


        </div>
        <v-navigation-drawer
          v-model="drawer"
          hide-overlay
          location="right"
          right
          app
          class="navigation-mobile"
        >
          <div class="head px-2 py-3 d-flex">
            <div class="logo"><nuxt-link to="/"><img src="~/assets/img/logo/logo.png"/></nuxt-link></div>

            <v-btn icon @click="drawer = false" elevation="0">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-divider class="head-divider" color="#ccc"></v-divider>

          <v-list class="top-level-list">
            <div class="list-parent hasChild">


              <v-list-group
              ><!--FIRST DROPDOWN-->
                <template v-slot:activator>
                  <v-list-item
                    to="/categories"
                    class="parent-link">
                    <v-list-item-title>دسته بندی ها</v-list-item-title>
                  </v-list-item>
                </template>

                <div v-for="(child, j) in menuItems" :key="j">

                  <!--END OF FIRST SUBMENU-->

                  <v-list-group sub-group >
                    <template v-slot:activator>
                      <v-list-item
                        :to="'/categories/detail/'+child.id"
                      >
                        <v-list-item-title>{{ child.name }}</v-list-item-title>
                      </v-list-item>
                    </template>

                    <div
                      v-for="(grandchild, k) in child.children"
                      :key="k"
                      class="latest-child"
                    >
                      <v-list-item
                     :to="'/categories/detail/'+grandchild.id"

                      >
                        <v-list-item-title>{{ grandchild.name }}</v-list-item-title>
                      </v-list-item>
                    </div>
                  </v-list-group>
                </div>
              </v-list-group>
            </div>
            <div  class="list-parent">
              <v-list-item to="/designer">
                <v-list-item-title>طراحان</v-list-item-title>
              </v-list-item>
            </div>
            <div class="list-parent hasChild">


              <v-list-group
              ><!--FIRST DROPDOWN-->
                <template v-slot:activator>
                  <v-list-item
                    to="/promotion"
                    class="parent-link">
                    <v-list-item-title>تخفیف ها</v-list-item-title>
                  </v-list-item>
                </template>

                <div v-for="(child, j) in promotions" :key="j"    class="latest-child">

                  <!--END OF FIRST SUBMENU-->

                      <v-list-item
                        :to="'/promotions/'+child.id"
                      >
                        <v-list-item-title>{{ child.title }}</v-list-item-title>
                      </v-list-item>


                </div>
              </v-list-group>
            </div>

            <div  class="list-parent">
              <v-list-item to="/blog">
                <v-list-item-title>لاینومگ</v-list-item-title>
              </v-list-item>
            </div>
            <div  class="list-parent">
              <v-list-item to="/contact">
                <v-list-item-title>تماس با ما </v-list-item-title>
              </v-list-item>
            </div>
          </v-list>
        </v-navigation-drawer>

        <div class="navbar-action">
          <v-btn icon @click="drawer = true" elevation="0" class="mobileNav">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <div class="search" @click="openSearch">
            <SvgIcon
              name="search"
              color=#676767
              size="25px"
              className="rounded-full"
            />

          </div>
          <div class="logo-mobile"><nuxt-link to="/"><img src="~/assets/img/logo/logo4.png"/></nuxt-link></div>
          <nuxt-link to="/signin" class="signIn" v-show="!authenticate">
              <span>ورود  <v-divider vertical /> عضویت</span>
            <div class="mobile">
              <SvgIcon
                name="user"
                color=#676767
                size="25px"
                className="rounded-full"
              />

            </div>
          </nuxt-link>
          <nuxt-link to="/page/userManager" class="signIn"  v-show="authenticate">

          <SvgIcon
              name="user"
              color=#676767
              size="25px"
              className="rounded-full"
            />

          </nuxt-link>
          <div  class="cart" @click="goToCart()">
            <SvgIcon
              name="cart"
              color=#676767
              size="28px"
              className="rounded-full"
            />
            <div class="isFill" v-show="cart?.items?.length > 0">{{cart?.items?.length}}</div>
          </div>
        </div>
      </nav>
      <div class="search-box" :class="showSearch ? 'showSearch' : ''">
    <v-icon  @click="showSearch = false"  >mdi mdi-close</v-icon>
<div class="searchBlock">

  <form @submit.prevent="handleSearch">
    <v-text-field
      v-model.trim="searchText"
      dense
      filled
      rounded
      clearable
      placeholder="جستجو"
      @click:clear="clear()"
      prepend-inner-icon="mdi-magnify"
      class="pt-6 shrink expanding-search"
    ></v-text-field>
  </form>
</div>
      </div>

    </v-app-bar>
</template>

<script src="./TheHeader.component.js"></script>

<style lang="scss" scoped src="./TheHeader.component.scss"></style>
