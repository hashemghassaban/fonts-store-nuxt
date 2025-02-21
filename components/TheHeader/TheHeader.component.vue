<template>
  <v-card
    color="box-header"
    flat
    tile
    :elevation="0"
    :class="{ onScrollContent: !view.topOfPage }"
  >
    <div class="greenBar">
      <div class="phoneNumber">
        <span>شماره تماس</span>
        <a href="tel:05137120000"><small>051 - </small>37120000</a>
      </div>
    </div>
    <v-toolbar height="110px" class="headerMain" :elevation="0">
      <div class="mobileBox">
        <v-btn icon @click="drawer = true" elevation="0">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <nuxt-link to="/" class="logoMobile">
          <img src="@/assets/images/logo/logo.svg" alt="logo" />
        </nuxt-link>
        <div class="menu-mobile"></div>
      </div>
      <div class="topHeader d-flex align-centerّ custom-container">
        <nuxt-link to="/">
          <img src="@/assets/images/logo/logo.svg" alt="logo" />
          <h1 hidden>فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی آلاساز</h1>
        </nuxt-link>
        <!-- <v-autocomplete
          v-model="selectSearch"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          class="mx-4 search-header"
          flat
          item-text="name"
          item-value="number"
          autofocus
          counter
          focused
          hide-no-data
          placeholder="محصول مورد نظر خود را جستجو کنید ..."
          prepend-inner-icon="mdi-magnify "
          solo-inverted
          return-object
          @input="setTypingStatus(true)"
          @blur="setTypingStatus(false)"
          @change="(event) => goToDetail(event)"
          @keyup.enter="reqSearch()"
          @click:prepend-inner="reqSearch()"
        >
        </v-autocomplete> -->
        <autocomplete
          :search="search"
          placeholder="محصول مورد نظر خود را جستجو کنید..."
          aria-label="Search Wikipedia"
          :get-result-value="getResultValue"
          class="mx-4 search-header"
          @submit="handleSubmit"
          @keyup.enter="reqSearch()"
        >
          <template #result="{ result, props }">
            <li
              v-bind="props"
              class="autocomplete-result result"
              @click="goToDetail(result)"
            >
              <div class="result-pic">
                <img
                  :src="
                    'https://cdn.alasaz.com/Files/' +
                    result?.imagePath +
                    '?width=50&height=50'
                  "
                  :alt="result?.name"
                  v-if="!!result?.imagePath?.length"
                />

                <img
                  v-else-if="!!result?.imagesPaths?.length"
                  :src="
                    'https://cdn.alasaz.com/Files/' +
                    result.imagesPaths[0]?.imagePath +
                    '?width=50&height=50'
                  "
                  :alt="result.name"
                />
                <img
                  v-else
                  src="@/assets/images/icons/image-placeholder.svg"
                  alt="no-product"
                  class="no-product"
                />
              </div>
              <div class="result-name">
                <b> {{ result.name }}</b>
                <span> {{ result.number }}</span>
              </div>
            </li>
          </template></autocomplete
        >

        <v-spacer></v-spacer>

        <div class="menu-account d-flex items-center">
          <div class="mobile-account">
            <v-menu bottom min-width="200px" rounded offset-y v-if="authenticate">
              <template v-slot:activator="{ on }">
                <v-btn icon x-medium v-on="on" elevation="0">
                  <v-icon size="30">mdi-account-circle-outline</v-icon>
                  <v-icon size="20">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <div class="label">
                      <span>{{
                        user?.firstName
                          ? user?.firstName + " " + user?.lastName
                          : user?.userName
                      }}</span>
                    </div>

                    <div class="px-2 d-flex">
                      <v-btn
                        depressed
                        rounded
                        text
                        @click="goToProfile()"
                        width="50%"
                        elevation="0"
                      >
                        حساب کاربری
                      </v-btn>
                      <v-btn
                        depressed
                        rounded
                        text
                        @click="logout()"
                        width="50%"
                        elevation="0"
                      >
                        خروج
                      </v-btn>
                    </div>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
            <div @click="goToSign()" class="login d-flex" v-else>
              <v-icon>mdi-login-variant</v-icon>
              <span>ورود / ثبت نام</span>
            </div>
          </div>

          <v-divider vertical />
          <v-menu
            bottom
            max-width="425px"
            rounded
            offset-y
            accent
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                x-large
                v-on="on"
                color="#1a9520 "
                class="mr-3"
                elevation="0"
                @click="getListCart()"
              >
                <v-icon>mdi-cart-plus</v-icon>
                <span class="count-cart">
                  {{ authenticate ? lengthCart : lengthCartLocal }}
                </span>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center cart-drop">
                <div class="cart-drop--action">
                  <v-btn
                    rounded
                    color="primary"
                    outlined
                    @click="cart()"
                    elevation="0"
                    :disabled="authenticate ? lengthCart === 0 : lengthCartLocal === 0"
                  >
                    <v-icon size="20">mdi-cart-plus</v-icon>
                    <span>بررسی سبد خرید</span>
                  </v-btn>
                  <v-btn
                    rounded
                    color="primary"
                    @click="payment()"
                    :disabled="authenticate ? lengthCart === 0 : lengthCartLocal === 0"
                    elevation="0"
                    >تسویه حساب</v-btn
                  >
                </div>
                <div class="cart-drop--subject">
                  <span class="text">جزئیات سبد خرید</span>
                  <div class="total">
                    <div class="total-text">مبلغ کل :</div>
                    <p>
                      {{ formatPrice(totalPrice) }}
                      <span> <tooman-svg /> </span>
                    </p>
                  </div>
                </div>

                <div class="cart-drop--content">
                  <v-progress-linear
                    :active="loadingCart"
                    :indeterminate="loadingCart"
                    color="primary"
                  ></v-progress-linear>
                  <div v-for="(item, index) in dataCart" :key="index">
                    <div class="cart-drop--content__list white">
                      <v-sheet color="grey lighten-2" v-if="isLoading === index">
                        <v-skeleton-loader
                          class="mx-auto mt-2 mb-2 elevation-0"
                          type="article"
                        ></v-skeleton-loader>
                      </v-sheet>
                      <div v-else>
                        <div class="box">
                          <div class="pic" @click="showDetailProduct(item)">
                            <span>
                              <img
                                :src="
                                  'https://cdn.alasaz.com/Files/' +
                                  item?.imagePath +
                                  '?width=100&height=100'
                                "
                                :alt="item?.name"
                                v-if="!!item?.imagePath?.length"
                              />

                              <img
                                v-else-if="!!item?.imagesPaths?.length"
                                :src="
                                  'https://cdn.alasaz.com/Files/' +
                                  item.imagesPaths[0]?.imagePath +
                                  '?width=100&height=100'
                                "
                                :alt="item.name"
                              />
                              <img
                                v-else
                                src="@/assets/images/icons/image-placeholder.svg"
                                alt="no-product"
                                class="no-product"
                              />
                            </span>
                          </div>
                          <div class="name" @click="showDetailProduct(item)">
                            {{ item.productName ? item.productName : item.name }}
                            <div class="activate">
                              <div v-for="(e, index) in item?.variants" :key="index">
                                <span class="d-flex text-caption mt-2">
                                  <span
                                    v-if="e?.attributeDisplayType === 2"
                                    class="attr-color"
                                  >
                                    رنگ :
                                    {{ authenticate ? e.value : e.colorSelectText }}</span
                                  >
                                  <b v-else>{{ e.text ? e.text : e.value }}</b>
                                </span>
                              </div>

                              <div class="rate" v-if="!!item.commentsAverageRate">
                                <v-rating
                                  length="5"
                                  readonly
                                  v-model="item.commentsAverageRate"
                                  color="yellow darken-2"
                                  background-color="#ccc"
                                  icon="mdi-star"
                                  size="35"
                                  empty-icon="mdi-star"
                                  full-icon="mdi-star"
                                ></v-rating>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="box">
                          <v-btn
                            icon
                            @click="removeCart(item, index)"
                            class="trash-icon"
                            elevation="0"
                          >
                            <v-icon>mdi-trash-can-outline</v-icon>
                          </v-btn>
                          <div class="count">
                            <div class="number-input">
                              <button
                                @click="increaseCart(index, item, item.quantity)"
                                class="max"
                              >
                                +
                              </button>
                              <span class="quantity">
                                <b>{{ item.quantity }}</b>
                              </span>
                              <button @click="decreaseCart(item, index)" class="min">
                                -
                              </button>
                            </div>
                          </div>
                          <div class="pricing">
                            <p class="price">
                              {{
                                item?.selectInfoVariation?.variationId
                                  ? item.selectInfoVariation.offPrice
                                    ? formatPrice(item.selectInfoVariation.offPrice)
                                    : formatPrice(item.selectInfoVariation.price)
                                  : formatPrice(
                                      item.offPrice ? item.offPrice : item.price
                                    )
                              }}
                              <span>
                                <tooman-svg />
                              </span>
                            </p>

                            <div
                              v-if="
                                (item.offPrice !== item.price &&
                                  item.offPrice !== 0 &&
                                  item.offPrice !== null) ||
                                (item?.selectInfoVariation?.offPrice !==
                                  item?.selectInfoVariation?.price &&
                                  item?.selectInfoVariation?.offPrice !== 0 &&
                                  item?.selectInfoVariation?.offPrice !== null)
                              "
                            >
                              <div>
                                <del class="discount">
                                  {{
                                    item?.selectInfoVariation?.variationId
                                      ? formatPrice(item.selectInfoVariation.price)
                                      : formatPrice(item.price)
                                  }}
                                </del>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="hint" v-if="status === 3">
                    <v-icon color="#fff" size="20">mdi-alert-circle-outline</v-icon>
                    کاربر گرامی، سفارش شما در حال بررسی و در انتظار تایید کارشناسان آلاساز
                    می باشد.
                  </div>
                  <div class="hintInProcess" v-if="status === 2">
                    <v-icon color="#fff" size="20">mdi-alert-circle-outline</v-icon>
                    کاربر گرامی، جهت تکمیل سفارش باید تمام فرایند خرید را طی کنید.
                  </div>
                  <div
                    v-if="authenticate ? lengthCart === 0 : lengthCartLocal === 0"
                    class="product-list text-center d-block"
                  >
                    <img
                      src="@/assets/images/icons/no-data-pro.svg"
                      alt="no data"
                      width="130"
                    />
                    <p class="empty-text">سبد خرید خالی است</p>
                  </div>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </div>
      </div>
      <div class="bottomHeader"><Nav-bar :menuLink="this.menu" /></div>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      hide-overlay
      location="right"
      right
      app
      class="navigation-mobile"
    >
      <div class="head px-2 py-3 d-flex">
        <nuxt-link to="/">
          <img src="@/assets/images/logo/logo.svg" width="100" />
        </nuxt-link>
        <v-btn icon @click="drawer = false" elevation="0">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider class="head-divider" color="#000"></v-divider>

      <v-list class="top-level-list">
        <div v-for="(link, i) in menu" :key="i" class="list-parent">
          <v-list-item v-if="!link.childrenCategories">
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item>

          <v-list-group v-else-if="link.childrenCategories"
            ><!--FIRST DROPDOWN-->
            <template v-slot:activator>
              <v-list-item
                :to="'/categories/' + link.number + '/' + link.name.replaceAll(' ', '-')"
                class="parent-link"
              >
                <v-list-item-title>{{ link.name }}</v-list-item-title>
              </v-list-item>
            </template>

            <div v-for="(child, j) in link.childrenCategories" :key="j">
              <v-list-item
                v-if="!child.childrenCategories"
                :to="
                  '/categories/' + child.number + '/' + child.name.replaceAll(' ', '-')
                "
              >
                <v-list-item-title>{{ child.name }}</v-list-item-title>
              </v-list-item>
              <!--END OF FIRST SUBMENU-->

              <v-list-group sub-group v-else>
                <template v-slot:activator>
                  <v-list-item
                    :to="
                      '/categories/' +
                      child.number +
                      '/' +
                      child.name.replaceAll(' ', '-')
                    "
                  >
                    <v-list-item-title>{{ child.name }}</v-list-item-title>
                  </v-list-item>
                </template>

                <div
                  v-for="(grandchild, k) in child.childrenCategories"
                  :key="k"
                  class="latest-child"
                >
                  <v-list-item
                    v-if="!!grandchild.childrenCategories"
                    :to="
                      '/categories/' +
                      grandchild.number +
                      '/' +
                      grandchild.name.replaceAll(' ', '-')
                    "
                  >
                    <v-list-item-title>{{ grandchild.name }}</v-list-item-title>
                  </v-list-item>
                </div>
              </v-list-group>
            </div>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <div class="showNewVersion" @click="eraseCache()" :class="{ show: showNewVersion }">
      <p title="کلیک کنید">
        کاربر گرامی نسخه جدید آلاساز منتشر شد ، جهت استفاده از امکانات فروشگاه لطفا بر روی
        این پیام کلیک کنید. <small>({{ version }})</small>
      </p>
    </div>
  </v-card>
</template>

<script src="./TheHeader.component.js"></script>

<style lang="scss" scoped src="./TheHeader.component.scss"></style>
