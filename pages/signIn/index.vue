<template>
  <client-only>
    <section class="block py-10 accent">
      <nuxt-link to="/" class="logo">
        <img src="@/assets/images/logo/logo.svg" alt="logo" />
      </nuxt-link>
      <ul class="timeline">
        <li class="active">
          <nuxt-link to="/cart">
            <b> <v-icon> mdi-cart-outline</v-icon><span>سبدخرید</span> </b>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/cart">
            <b>
              <v-icon>mdi-package-variant-closed</v-icon><span>زمان و نحوه ارسال</span>
            </b>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/cart">
            <b><v-icon>mdi-credit-card-multiple</v-icon><span>پرداخت</span></b>
          </nuxt-link>
        </li>
      </ul>
      <div class="block-cart">
        <div class="block-cart-product">
          <div class="hint" v-if="status === 3">
            <v-icon color="#fff" size="20">mdi-alert-circle-outline</v-icon>
            کاربر گرامی، سفارش شما در حال بررسی و در انتظار تایید کارشناسان آلاساز می
            باشد.
          </div>
          <div class="hintInProcess" v-if="status === 2">
            <v-icon color="#fff" size="20">mdi-alert-circle-outline</v-icon>
            کاربر گرامی، جهت تکمیل سفارش باید تمام فرایند خرید را طی کنید.
          </div>
          <div class="product-list" v-for="(item, index) in dataCart" :key="index">
            <v-sheet class="mx-auto mt-0 mb-5 py-7" v-if="isLoading === index">
              <v-skeleton-loader
                class="elevation-0 mx-auto"
                type="list-item-two-line, table-tfoot"
              ></v-skeleton-loader>
            </v-sheet>
            <div class="product-list-box" v-else>
              <div class="product-list-pic" @click="showDetailProduct(item)">
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
              <div class="product-list-spec">
                <div class="product-list-content">
                  <div class="d-flex justify-space-between">
                    <h3 @click="showDetailProduct(item)">
                      {{ item.productName ? item.productName : item.name }}
                      <div class="activate">
                        <div v-for="(e, index) in item?.variants" :key="index">
                          <span class="d-flex text-caption mt-2">
                            <span v-if="e?.attributeDisplayType === 2" class="attr-color">
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
                    </h3>
                    <div class="product-list-price">
                      <div class="current-price">
                        <p class="price">
                          <span>
                            {{
                              item?.selectInfoVariation?.variationId
                                ? item.selectInfoVariation.offPrice
                                  ? formatPrice(item.selectInfoVariation.offPrice)
                                  : formatPrice(item.selectInfoVariation.price)
                                : formatPrice(item.offPrice ? item.offPrice : item.price)
                            }}
                          </span>
                          <tooman-svg />
                        </p>
                      </div>

                      <div>
                        <del
                          class="old-price"
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
                          {{
                            item?.selectInfoVariation?.variationId
                              ? formatPrice(item.selectInfoVariation.price)
                              : formatPrice(item.price)
                          }}
                        </del>
                      </div>
                    </div>
                  </div>

                  <div class="count">
                    <div class="number-input">
                      <button
                        @click="increaseCart(index, item, item.quantity)"
                        class="max"
                      >
                        +
                      </button>
                      <span class="quantity">{{ item.quantity }}</span>
                      <button @click="decreaseCart(item, index)" class="min">-</button>
                    </div>

                    <v-btn
                      icon
                      class="delete-Pro"
                      @click="removeCart(item, index)"
                      elevation="0"
                    >
                      <v-icon class="icons-trash">mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="loadingSkeletonCart">
            <v-sheet color="grey lighten-2">
              <v-skeleton-loader type="image" class="elevation-0"></v-skeleton-loader>
            </v-sheet>
          </div>
          <div
            v-if="dataCart?.length === 0 && loadingSkeletonCart === false"
            class="product-list text-center d-block no-pro"
          >
            <img src="@/assets/images/icons/no-data-pro.svg" alt="no data" width="130" />
            <p class="empty-text">سبد خرید خالی است</p>
          </div>
        </div>

        <div class="block-cart-pricing">
          <div class="pricing">
            <div class="pricing-box">
              <label for="">قیمت کالا ها ({{ lengthCart }})</label>
              <div class="price">
                <span>{{ formatPrice(totalPrice) }}</span>
                <tooman-svg />
              </div>
            </div>
            <div class="pricing-profit">
              <label for="">سود شما از خرید</label>
              <div class="price">
                <span>{{ formatPrice(totalDiscount) }}</span>
                <tooman-svg />
              </div>
            </div>
            <v-divider></v-divider>
            <div class="pricing-total">
              <label for="">جمع کل</label>
              <div class="price">
                <span>{{ formatPrice(totalPriceProcess) }}</span>
                <tooman-svg />
              </div>
            </div>
            <v-btn
              color="#1a9520"
              class="buy"
              rounded
              @click="Shopping()"
              elevation="0"
              :disabled="totalPrice === 0"
              >اقدام به خرید</v-btn
            >
            <div class="product-vector">
              <img src="@/assets/images/vector/Catalogue-cuate.svg" alt="Catalogue" />
            </div>
          </div>
        </div>
        <div class="back">
          <nuxt-link to="/">
            <v-icon>mdi-chevron-double-right</v-icon>
            صفحه اصلی
          </nuxt-link>
        </div>
      </div>
    </section>
  </client-only>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
