<template>

    <v-app-bar :elevation="2" class="header">
      <nav class="navbar">
        <!-- Brand Section -->

        <div class="navbar-brand"><nuxt-link to="/"><img src="~/assets/img/logo/logo.png"/></nuxt-link></div>

        <!-- Navigation Links -->
        <div class="navbar-links">

          <Nav-bar :menuLink="this.menuItems" />


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
            <div v-for="(link, i) in menuItems" :key="i" class="list-parent hasChild">
              <v-list-item v-if="!link.category">
                <v-list-item-title>{{ link.name }}</v-list-item-title>
              </v-list-item>

              <v-list-group v-else-if="link.category"
              ><!--FIRST DROPDOWN-->
                <template v-slot:activator>
                  <v-list-item
                    to="/home"
                    class="parent-link">
                    <v-list-item-title>{{ link.name }}</v-list-item-title>
                  </v-list-item>
                </template>

                <div v-for="(child, j) in link.category" :key="j">
                  <v-list-item
                    v-if="!child.category"
                    to="home">
                    <v-list-item-title>{{ child.name }}</v-list-item-title>
                  </v-list-item>
                  <!--END OF FIRST SUBMENU-->

                  <v-list-group sub-group v-else>
                    <template v-slot:activator>
                      <v-list-item
                        to="
                      '/categories/'
                    "
                      >
                        <v-list-item-title>{{ child.name }}</v-list-item-title>
                      </v-list-item>
                    </template>

                    <div
                      v-for="(grandchild, k) in child.category"
                      :key="k"
                      class="latest-child"
                    >
                      <v-list-item
                        v-if="!!grandchild.category"
                        to="
                     /home
                    "
                      >
                        <v-list-item-title>{{ grandchild.name }}</v-list-item-title>
                      </v-list-item>
                    </div>
                  </v-list-group>
                </div>
              </v-list-group>
            </div>
            <div  class="list-parent">
              <v-list-item to="/linomag">
                <v-list-item-title>لاینومگ</v-list-item-title>
              </v-list-item>
            </div>
            <div  class="list-parent">
              <v-list-item to="/about">
                <v-list-item-title>درباره ما </v-list-item-title>
              </v-list-item>
            </div>
            <div  class="list-parent">
              <v-list-item to="/workUs">
                <v-list-item-title>همکاری با ما</v-list-item-title>
              </v-list-item>
            </div>
            <div  class="list-parent">
              <v-list-item to="/support">
                <v-list-item-title>پشتیبانی</v-list-item-title>
              </v-list-item>
            </div>
            <div  class="list-parent">
              <v-list-item to="/faq">
                <v-list-item-title>سوالات متداول</v-list-item-title>
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
          <nuxt-link to="/signin" class="signIn" v-if="false">
              <span>ورود  <v-divider vertical /> عضویت</span>
          </nuxt-link>
          <nuxt-link to="/page/userManager" class="signIn" v-else>

          <SvgIcon
              name="user"
              color=#676767
              size="25px"
              className="rounded-full"
            />

          </nuxt-link>
          <nuxt-link to="/cart" class="cart">
            <SvgIcon
              name="cart"
              color=#676767
              size="28px"
              className="rounded-full"
            />
            <div class="isFill"></div>
          </nuxt-link>
        </div>
      </nav>
      <div class="search-box" :class="showSearch ? 'showSearch' : ''">
    <v-icon  @click="showSearch = false"  >mdi mdi-close</v-icon>
<div class="searchBlock">
  <v-text-field
    v-model.trim="searchText"
    dense
    filled
    rounded
    clearable
    placeholder="جستجو"
    prepend-inner-icon="mdi-magnify"
    class="pt-6 shrink expanding-search"
  ></v-text-field>
</div>
      </div>

    </v-app-bar>
</template>

<script src="./TheHeader.component.js"></script>

<style lang="scss" scoped src="./TheHeader.component.scss"></style>
