<template>
  <div class="app">
    <client-only>

<section class="banner-main">
    <div v-if="loadingPage" class="carouselMain-desktop-skeleton">
      <v-sheet color="grey lighten-2">
        <v-skeleton-loader type="image" class="elevation-0"></v-skeleton-loader>
      </v-sheet>
    </div>
    <v-carousel
      cycle
      class="carouselMain-desktop"
      height="580px"
      v-else
    >
      <v-carousel-item v-for="(slide, i) in dataResult?.slids?.main" :key="i">
        <a  :href="slide?.link !== null ? slide?.link  :'#'" >
          <v-sheet height="100%">
            <div class="slide-back">
              <img
                :src="

                      slide.image_url +
                      '?width=auto&height=300'
                    "

                :alt="slide.title"
                height="100%"
                class="desktop"
              />
            </div>
          </v-sheet>
        </a>
      </v-carousel-item>
    </v-carousel>
    <div v-if="loadingPage" class="carouselMain-mobile-skeleton">
      <v-sheet color="grey lighten-2">
        <v-skeleton-loader type="image" class="elevation-0"></v-skeleton-loader>
      </v-sheet>
    </div>
    <v-carousel
      cycle
      class="carouselMain-mobile"
      height="250px"
      :show-arrows="false"
      v-else
    >
      <v-carousel-item v-for="(slide, i) in dataResult?.slids?.main" :key="i">
        <a :href="slide?.link !== null ?slide?.link  :'/'" >
          <v-sheet height="100%">
            <div class="slide-back">
              <img
                :src="

                      slide.mobile_image_url +
                      '?width=auto&height=300'
                    "

                :alt="slide.title"
                height="100%"
                class="desktop"
              />
            </div>
          </v-sheet>
        </a>
      </v-carousel-item>
    </v-carousel>
</section>

      <section class="category">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="category"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">دسته بندی فونت</h2>
        </div>
        <div v-if="loadingPage" class="loading-box">
            <v-sheet color="grey lighten-2"  v-for="(item, i) in 3">
              <v-skeleton-loader
                class="elevation-0"
                type="image"
              ></v-skeleton-loader>
            </v-sheet>
        </div>
        <div class="category-block" v-else>
          <div class="col-3" v-for="(item, i) in (dataResult?.categories)?.slice(0, 4)" :key="i">
            <nuxt-link :to="'/categories/' + item.id" >
            <div class="box">



              <div class="count">+{{item.products_count}}</div>
              <div class="icon">
                <img
                  :src="require(`~/assets/img/element/box0${i+1}.png`)"
                  alt=""
                />

              </div>
              <div class="text">
                <span>{{item.name}}</span>
                <button> <SvgIcon
                  name="arrow"
                  color="#AAE73E"
                  size="1.3rem"
                  className="rounded-full"
                /></button>

              </div>
            </div>
            </nuxt-link>

          </div>


        </div>

      </section>
      <section class="latest-font">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="awsome"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text"> شگفت‌انگیز</h2>
        </div>
        <div v-if="loadingPage" class="loading-box-2">
          <v-sheet color="grey lighten-2">
            <v-skeleton-loader
              class="elevation-0"
              type="image"
            ></v-skeleton-loader>
          </v-sheet>
        </div>
        <div class="latest-font-block" v-else>

          <div class="box" v-for="(item, i) in dataResult?.promoted_products" >
            <Product :typeProduct="'product'" :items="item" @refreshData="refreshData"/>
          </div>

        </div>
      </section>
      <section class="banners">
        <div v-if="loadingPage"  class="loading-box-3">
          <v-sheet color="grey lighten-2" v-for="(item, i) in 3">
            <v-sheet color="grey lighten-2">
              <v-skeleton-loader
                class="elevation-0"
                type="card-avatar, article"
              ></v-skeleton-loader>
            </v-sheet>
          </v-sheet>
        </div>
        <div class="banners-block" v-else>
          <div class="banners-box" v-for="(item, i) in dataResult?.slids?.side" >
            <div class="box">
              <nuxt-link :to="item?.link !== null ?item?.link  :'/'" >
                <img :src="item.mobile_image_url" alt="">
                <v-btn>
                  <SvgIcon
                    name="arrow"
                    color="#fff"
                    size="10px"
                    className="rounded-full"
                  />
                  <span>خرید</span>
                </v-btn>
              </nuxt-link>

            </div>

          </div>

        </div>
      </section>

      <section class="latest-font last">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="latest"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">   فونت های ویژه</h2>
          <nuxt-link to="/product" class="show-More">
             همه </nuxt-link>
        </div>
        <div class="latest-font-block">
          <div v-if="loadingPage"  class="loading-box-4">
            <v-sheet color="grey lighten-2" v-for="(item, i) in 4">
              <v-sheet color="grey lighten-2">
                <v-skeleton-loader
                  class="elevation-0"
                  type="card-avatar, article"
                ></v-skeleton-loader>
              </v-sheet>
            </v-sheet>
          </div>
          <div class="box" v-for="(item, i) in dataResult?.top_sell" v-else>
            <Product :typeProduct="'noProduct'" :items="item" @refreshData="refreshData"/>
          </div>

        </div>
      </section>

      <section class="feature">
        <div class="feature-block">
          <div class="feature-block-play" @click="showVideo">
            <img src="~/assets/img/icon/play.svg" alt="">
          </div>
        </div>
        <div class="feature-title">
          ویژگی‌های فونت لاینوتایپ
        </div>
        <v-dialog width="800" v-model="dialogVideo" persistent  >


          <v-card

            prepend-icon="mdi-update"
            text="Your application will relaunch automatically after the update is complete."
            title="Update in progress"
            class="block-video"
            >
            <v-icon  @click="hideVideo" class="close" color="#fff">mdi-close</v-icon>

            <video
            controls
            width="640"

            ref="videoPlayer"
            height="360"
            :src="videoSource"

          >
            Your browser does not support the video tag.
          </video></v-card
          >


        </v-dialog>
      </section>

      <section class="call-to-action">
        <div class="call-to-action-text">
          خبر داری از تخفیف‌های جدید؟!
        </div>
        <div class="call-to-action-form">
          <TextInput
            validators="email"
            class="my-2"
            :isValid.sync="isValid"
            v-model="email"
            label="ایمیل"
          />

          <v-btn
            elevation="0"
            class="primary btn"
            :loading="newsLoading"
            @click="sendNewsLetter()"
          >  <SvgIcon
            name="arrow"
            color="#000"
            size="15px"
            className="rounded-full"
            style="margin-left: 15px"
          />    خبردارم کن! </v-btn
          >
        </div>
      </section>
<section class="designer" >
  <h2>طراحان</h2>
  <nuxt-link to="/designer" class="show-More">
    همه </nuxt-link>
  <div v-if="loadingPage" class="loading-box">
    <v-sheet color="grey lighten-2"  v-for="(item, i) in 3">
      <v-skeleton-loader
        class="elevation-0"
        type="image"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
  <div v-else>
    <VueSlickCarousel v-bind="settingsDesigner" v-if="dataResult?.collections?.length > 0"  ref="carousel" >
      <div v-for="(item, i) in  dataResult?.collections" :key="i" class="product">
        <nuxt-link :to="'/designer/detail/'+item.id" class="product-data">
          <div
            class="pro-pic brand-logo"
          >
            <div class="pic">
              <img
                draggable="false"
                loading="lazy"
                onmousedown="return false"
                style="user-drag: none"
                :src="

                      item.icon_url +
                      '?width=auto&height=300'
                    "
                :alt="item.title"
                v-if="item.icon_url"
              />
            </div>
            <h3>{{ item.title }}</h3>
          </div>
        </nuxt-link>
      </div>

    </VueSlickCarousel>
    <button @click="previous" class="custom-prev">  <v-icon>mdi-chevron-left</v-icon></button>
    <button @click="next" class="custom-next">  <v-icon>mdi-chevron-right</v-icon></button>
  </div>


</section>
      <section class="postMain">
        <h2>  لاینومگ</h2>
        <nuxt-link to="/blog" class="show-More">
          همه </nuxt-link>
        <div v-if="loadingPage" class="loading-box-5">
          <v-sheet color="grey lighten-2"  v-for="(item, i) in 4">
            <v-skeleton-loader
              class="elevation-0"
              type="image"
            ></v-skeleton-loader>
          </v-sheet>
        </div>
        <div class="postMain-block" v-else>
          <div class="box"  v-for="(item, i) in (dataResult?.posts)?.slice(0, 4)"><Post :items="item" /></div>


        </div>

      </section>
    </client-only>
  </div>
</template>
<script>

import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Product from "@/components/product/product";
import Post from "@/components/post/post";

import TextInput from "@/components/TextInput/TextInput";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import VueSlickCarousel from "vue-slick-carousel";
import { homeService , productService } from '~/services'


export default {

  name: "home",
  head() {
    return {
      script: [{ type: "application/ld+json" }],
      title: "صفحه اصلی  - لاینو تایپ",
      htmlAttrs: {
        lang: "fa",
      },
      meta: [
        {
          hid: "og:site-name",
          property: "og:site_name",
          content: "لاینو تایپ",
        },
        {
          hid: "google-site-verification",
          name: "google-site-verification",
          content: "aGwNcRY3IOc1ckWzqXoajWVykBRGonfJBjiLwitBhY8",
        },
        { hid: "og-url", property: "og:url", content: "https://alasaz.com/" },

        { hid: "og-type", property: "og:type", content: "website" },
        {
          hid: "og-title",
          property: "og:title",
          content: "صفحه اصلی - لاینو تایپ",
        },
        {
          hid: "og-description",
          property: "og:description",
          content:
            "",
        },
        {
          hid: "og-image",
          property: "og:image",
          content: "../assets/img/logo/logo.svg",
        },

        {
          hid: "twitter-card",
          name: "twitter:card",
          content: "summary_large_image",
        },

        {
          hid: "description",
          name: "description",
          content:
            "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "",
        },

        {
          hid: "twitter-url",
          name: "twitter:url",
          content: "",
        },
        {
          hid: "twitter-title",
          name: "twitter:title",
          content: "صفحه اصلی  - لاینوتایپ",
        },
        {
          hid: "twitter-description",
          name: "twitter:description",
          content:
            "",        },
      ],
    };
  },

  components: {
    SvgIcon,
    Post,
    TextInput,
    Product,
    VueSlickCarousel
  },
  data () {
    return {
      isValid: false,
      email:'',
      loading: false,
      loadingBtn:false,
      dataResult:[],
      loadingPage: true,
      newsLoading:false,
      dialogVideo:false,
      indexPro:null,
      videoSource: 'https://www.w3schools.com/html/mov_bbb.mp4',
      phoneNumber:'',
      currentTime: 0,
      settingsDesigner: {
        autoplay: true,
        slidesToShow: 5,
        touchThreshold: 1,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        slidesToScroll: 1,
        infinite: true,

        responsive: [
          {
            breakpoint: 1800,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
      settingsBrand: {
        "arrows": false,
        "dots": false,
        "infinite": true,
        "slidesToScroll": 1,
        "autoplay": true,
        "speed": 2000,
        "autoplaySpeed": 2000,
        "cssEase": "linear",

        responsive: [
          {
            breakpoint: 1800,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    }
  },
  methods: {
    refreshData(newValue) {
      if(newValue ){
        this.getHomeBanners()
      }

    },
    async addToCart(pro , i) {
      console.log('pro',pro)
      this.loadingBtn = true
      this.indexPro = i
      let body = {
        product_price: pro.id,
      };
      try {
        const data = await productService.postProduct(body)
        this.$store.commit('setCart', data)
        this.$store.commit('setDialogCart', true)
        this.$toast.success('محصول به سبد خرید اضافه شد')
        this.loadingBtn = false;
      } catch (error) {
        console.error('خطا در دریافت محصول:', error)
        this.loadingBtn = false;
      }
    },
    previous() {
      this.$refs.carousel.prev()
    },
    next() {
      this.$refs.carousel.next()
    },
    showVideo(){
      this.dialogVideo = true
      this.$nextTick(() => {
        this.$refs.videoPlayer.play();
      });
    },
    hideVideo(){
      this.dialogVideo = false
      this.$nextTick(() => {
        this.$refs.videoPlayer.pause();
      });
    },
    async sendNewsLetter() {
      if(this.isValid){
      if(this.email?.length === 0){
        this.$toast.error('ایمیل نباید خالی باشد ', {
          timeout: 4000,
        })
        return;
      }
      let body = {
        email : this.email
      }
      this.newsLoading = true;
      try {
       await homeService.newsLetter(body)
        this.newsLoading = false;
        this.$toast.success(' ایمیل شما با موفقیت ثبت گردید.')

      } catch (error) {
        this.newsLoading = false;

        console.error('خطا در دریافت کاربران:', error)
      }
      }
    },
      async getHomeBanners() {
      try {
        const res = await homeService.getHome()
        setTimeout(() => {
          this.dataResult = res?.entity
          this.loadingPage = false;
        }, 2000);
      } catch (error) {
        console.error('خطا در دریافت کاربران:', error)
      }
    },

  },
  mounted() {
    this.getHomeBanners();


  }
};
</script>
<style lang="scss" scoped>
.loading-box{
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
  margin: 62px 14%;
  .v-sheet{
    flex: 30%;
    max-width: 30%;
  }
}
.loading-box-5{
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
  margin: 62px 14%;
  .v-sheet{
    flex: 22%;
    max-width: 22%;
  }
}
.loading-box-2{
  margin: 62px 0 0;
  min-height: 300px;
  height: 300px;
  display: block;
  ::v-deep {
    .v-skeleton-loader__image {
      min-height: 300px;
      height: 300px;
    }
  }

}
.loading-box-3{
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
  margin: 62px 20%;
  .v-sheet{
    max-width: 100%;
    flex: auto;
  }
}
.loading-box-4{
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
  margin: 62px 0;
  width: 100%;
  .v-sheet{
    max-width: 100%;
    flex: 47%;
    margin-bottom: 50px;
  }

}
.carouselMain-desktop-skeleton {
  min-height: 580px;
  height: 580px;
  display: none;
  @include breakpoint(medium) {
    display: block;
  }
  ::v-deep {
    .v-skeleton-loader__image {
      min-height: 580px;
      height: 580px;
    }
  }
}
.carouselMain-mobile-skeleton {
  min-height: 300px;
  height: 300px;
  display: block;
  @include breakpoint(medium) {
    display: block;
  }
  ::v-deep {
    .v-skeleton-loader__image {
      min-height: 300px;
      height: 300px;
    }
  }
  @include breakpoint(medium) {
    display: none;
  }
}
.designer {
  padding: 36px 12% 0;
  display: block;
  height: 300px;
  margin-bottom: 200px;
  position: relative;
  @include breakpoint(medium) {
    height: 500px;
    margin-bottom: 120px;

  }
  .show-More{
    position: absolute;
    left: 7%;
    top: 50px;
    font-size: 20px;
    color: #F15A24;
    font-weight: bold;
    @include breakpoint(medium) {
      left: 15%;
    }
  }

  h2{
    text-align: center;
    font-weight: bold;
  }


    .product {
      &-data {
        position: relative;


        .pro-pic {
          display: block;
          padding: 0 11px;
          .pic{
            height: 160px;
            overflow: hidden;
            border-radius: 15px;
            width: 100%;
            img {
              object-fit: cover;
              width: 100%;
              filter: grayscale(1);
              opacity: 0.5;
              height: 100%;


            }
          }

        }
      }
    }

  h3 {
    color: #000;
    margin: 5px 0;
    display: none;
    font-size: 12px;
  }
  p{
    font-size: 10px;
    color: #666666;
    line-height: 16px;
    display: none;
    text-align: justify;
    direction: rtl;
  }
  ::v-deep {
    .slick-slider{
      &:before{
        content: '';
        width: 5%;
        height: 100%;
        background: #fff;
        position: absolute;
        right: -18px;
        z-index: 1;
        top: 0;

      }
      &:after{
        content: "";
        width: 5%;
        height: 100%;
        background: #fff;
        position: absolute;
        left: -18px;
        top: 0;
        z-index: 1;
      }
    }
    .slick-track{
      padding: 103px 0;
    }
    .swiper-slide {
      text-align: center;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: auto;
      @include breakpoint(medium) {
        min-height: 195px;
      }
    }
    .carousel {
      background: #f5f5f5;
    }
  }
}
.category{
  padding: 50px 5%;
  &-block{
    display: flex;
    margin-top: 50px;
    padding: 0 ;
    flex-wrap: wrap;
    @include breakpoint(medium) {
      padding: 0 10%;
    }
    .col-3{
      width: 50%;
      flex: 50%;
      min-width: 50%;
      @include breakpoint(medium) {
        width: 25%;
        flex: 25%;
        min-width: 25%;
      }
    }
    .box{

      height: 150px;
      background: #000;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      @include breakpoint(medium) {
        height: 250px;
        width: 250px;
        margin: auto;
      }

      &:hover{
        background: #FF7A00;
        transition: all 0.3s ease;

        .count{color: #000}
        .text{
          span {
            color: #000
          }
          }
      }
      .icon{
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(50%, -50%);
        img{
          width: 35px;
          @include breakpoint(medium) {
            width: 50px;
          }
        }


      }
      .count{
        text-align: left;
        color: #fff;
        font-size: 20px;
        direction: ltr;
        margin: 10px 20px;
        font-family: sans-serif;
        font-weight: 700;
        @include breakpoint(medium) {
          font-size: 44px;
        }
      }
      .text{
        display: flex;
        span{
          color: #fff;
          position: absolute;
          bottom: 20px;
          right: 15px;
          font-size: 15px;
          font-weight: 800;
          @include breakpoint(medium) {
            font-size: 25px;
          }
        }
        button{
          position: absolute;
          left: 20px;
          bottom: 20px;
          @include breakpoint(medium) {
            left: 25px;
            bottom: 28px;
          }
          i{
            font-size: 18px!important;
            @include breakpoint(medium) {
              font-size: 1.3rem!important;
            }
          }

        }

      }

    }
  }
}
.latest-font{
  padding: 50px 5%;
  position: relative;
  .show-More{
    position: absolute;
    left: 7%;
    top: 50px;
    font-size: 20px;
    color: #000;
    font-weight: bold;
    @include breakpoint(medium) {
      left: 15%;
    }
  }

  &.last{
    background: #EEE;
    padding: 50px 5% 230px;
  }
  &-block{
    display: flex;
    margin-top: 50px;
    padding: 0;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 15px;
    @include breakpoint(medium) {
      padding: 0 10%;
    }
    .box{
      max-width: 100%;
      flex: 100%;
      @include breakpoint(medium) {
        max-width: 50%;
        flex: 49%;
      }
    }
  }
}
.feature{
  padding: 10px 5%;
  position: relative;
  top: -170px;
  height: 208px;
  @include breakpoint(medium) {
    height: auto;
  }

  &-block{
    height: 250px;
    background: #fff;
    border-radius: 30px;
    overflow: hidden;
    background: url('./assets/img/banner/video.jpg');
    background-size: 100%;
    @include breakpoint(medium) {
      height: 585px;
    }
    &-play{
      width: 90px;
      height: 90px;
      border-radius: 100px;
      background: #000;
      position: absolute;
      right: 50%;
      bottom: -96px;
      transform: translate(50%, 0px);
      border: 8px solid #fff;
      cursor: pointer;
      text-align: center;
      line-height: 70px;
      transition: all 0.3s ease;
      @include breakpoint(medium) {
        width: 150px;
        height: 150px;
        transform:translate(50%, 100%);
        line-height: 125px;
        border: 11px solid #fff;
        bottom: 166px;

      }

      &:hover{
        border: 11px solid #FF7A00;
        transition: all 0.3s ease;

        img{
          filter: contrast(0.5);
          transition: all 0.3s ease;

        }

      }
      img{
        width: 25px;
        height: 25px;
        transition: all 0.3s ease;
        @include breakpoint(medium) {
          width: 35px;
          height: 35px;
        }

      }
    }


  }
  &-title{
    padding: 22px;
    font-size: 20px;
    color: #3A3A3A;
    margin: 40px 0 0;
    text-align: center;
    @include breakpoint(medium) {
      font-size: 25px;
      margin:0;
      text-align: right;
    }
  }
}

.call-to-action{
  display: flex;
  height: auto;
  justify-content: space-between;
  padding: 0 5%;
  flex-direction: column;
  margin-bottom: 100px;
  @include breakpoint(medium) {
    height: 266px;
    padding: 0 15%;
    flex-direction: row;
    margin-bottom: 0;
  }
  &-text{
    color: #F15A24;
    font-size: 29px;
    font-weight: 900;
    padding: 48px 0;
    text-align: center;

    @include breakpoint(medium) {
      text-align: right;
      font-size: 40px;
      padding: 48px;

    }

  }
  &-form{
    display: flex;
    flex-direction: column;
    .v-btn{
      margin: 17px 0;
    }

  }
}
.banner-main{
  padding: 0 5%;
  margin-top: 160px;
  margin-bottom: 60px;
  ::v-deep {
  .slide-back img {

    border-radius: 15px;
    overflow: hidden;
  }
  }
}
.brands {
  padding: 36px 15% 0;
  display: block;
  height: auto;
  margin-bottom: 0;
  @include breakpoint(medium) {
    height: 360px;
    margin-bottom: 10px;
    margin-top: 100px;
  }
  h2{
       text-align: center;
       font-weight: bold;
     }
  ::v-deep {
    .swiper-slide {
      text-align: center;
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: auto;
      @include breakpoint(medium) {
        min-height: 195px;
      }
    }
    .carousel {
      background: #f5f5f5;
    }
  }
  .product {
    &-data {
      height: 150px;
      .pro-pic {
        height: 300px;
        display: inline;


          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background: #fff;
          }

      }
    }
  }
}
.postMain{
  margin-bottom: 100px;
  position: relative;
  margin-top: 100px;
  .show-More{
    position: absolute;
    left: 16%;
    top: 0;
    font-size: 20px;
    color: #F15A24;
    font-weight: bold;
  }

  h2{
    text-align: center;
    font-weight: bold;
  }
  &-block{
    display: flex;
    width: 100%;
    padding: 40px 5% 0;
    flex-wrap: wrap;
    @include breakpoint(medium) {
      padding: 40px 15%;

    }
    .box{
      flex: 50%;
      max-width: 50%;
      padding: 0 10px;
      @include breakpoint(medium) {
        flex: 25%;
        max-width: 25%;
      }
    }
  }
}
.carouselMain {
  &-desktop {
    overflow: inherit!important;
    border-radius: 15px;
   display: none;
    @include breakpoint(medium) {
      display: block;

    }

  }
  &-mobile {
    display: block;
    overflow: inherit!important;
    border-radius: 15px;
    @include breakpoint(medium) {
      display: none;

    }


  }
}
.banners{
  &-block{
    display: flex;
    gap: 20px;
    margin: 0 0 100px;
    padding: 0 5%;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -12px;
    @include breakpoint(medium) {
      margin: 150px 0;
      padding: 0 15%;
    }

  }
  &-box{
    flex: 100%;
    max-width:100%;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    @include breakpoint(medium) {
      flex: 33.33%;
      max-width: 33.33%;
    }
    .box{
      width: 100%;
      height: 200px;
      position: relative;
      @include breakpoint(medium) {
        width: 100%;
        height:  100%;
      }

    }

    a{
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      &:hover{
        .v-btn{
          background: #fff;
          transition: all 0.3s ease;

        }
      }

      .v-btn{
        height: 40px !important;
        background: #AAE73E;
        border-radius: 10px;
        width: 100px;
        transition: all 0.3s ease;
        position: absolute;
        left: 10px;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        @include breakpoint(medium) {
          left: 20px;
          bottom: 30px;
        }
        i{
          width: 25px;
          height: 25px;
          background: #000;
          border-radius: 50px;
          line-height: 25px;
          margin-left: 10px;
          margin-top: 1px;
        }
        span{
          position: relative;
          font-weight: 800
        }


      }

    img{
      width: 100%;
      height: 100%;
      object-fit: fill;

    }



    }

  }
}
::v-deep {

  .slick-center{
    &.slick-current{


    position: relative;
    transform: scale(1.3) translate(0 , 10px);
      z-index: 1;
      h3{
        display: block!important;
      }
      p{
        display: block!important;
      }
    .product {
      &-data {


        .pro-pic {



          .pic {


            img {
              opacity: 1;
            }
          }
        }
      }
    }
    }


  }
  .v-carousel__controls {
    bottom: 5px !important;
    justify-content: flex-start;
  }
}




.carousel {
  overflow: hidden;
  border-radius: 10px;
}

::v-deep {
  .block-video {
    border: 0;
    height: auto;
    padding: 29px;
    background-color: #0000008f !important;
    border-radius: 10px !important;
    .close{
      position: relative;
      top: -15px;
      float: left;
    }
    video {
      width: 100%;
      height: 100%;
    }
  }
  .slick-next {
    opacity: 1;
    width: 48px;
    height: 48px;
    top: 48%;

  }
  .slick-prev {
    opacity: 1;
    left: 18px;
    z-index: 1;
    top: 48%;
    width: 48px;
    height: 48px;

  }
  .v-window__next{
    left: -40px!important;

  }
  .v-window__prev{
    right: -40px!important;

  }
  .v-btn--icon.v-size--default {
    height: 45px;
    width: 45px;
    background: #fff;
    transition: all 0.3s ease;

    &:hover{
      background: #FF7A00;
      transition: all 0.3s ease;

      .v-btn__content{
        color: #fff;
      }
    }
    .v-btn__content{
      color: #ccc;
    }
  }
  .slick-slider {
    width: 100%;
    height: 100%;
    float: right !important;
    position: relative;
  }
  .slide-back {
    height: 100%;


    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.desktop {
        display: block;
      }

    }
  }
}

::v-deep {
  .v-carousel__controls{
    bottom: -51px !important;
    background: inherit;
    &__item{
      &.v-btn--active{
        .v-btn__content {
          color: #F15A24;
        }
      }
      .v-btn__content{
        color: #bebebe;
        i{
          height: 6px;
          overflow: hidden;
        }
      }
    }
    .v-item-group{
      width: 100%;
      text-align: center;
      display: block;
    }
  }
  .slick-slider {
    width: 100%;
    height: 100%;
    float: right !important;
    position: relative;
  }
  .slide-back {
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &.desktop {
        display: block;
      }

    }
  }
}
::v-deep {
  .custom-prev{
    width: 45px !important;
    height: 45px !important;
    background: #fff;
    border-radius: 100px;
    position: absolute;
    left: 10%;
    top: 100%;
    transform: translate(0, -130%);
    transition: all 0.3s ease;
    @include breakpoint(medium) {
      left: 14%;
      top: 50%;
      transform: translate(0, -21%);
    }


    z-index: 2;
    &:hover{
      background: #ff5722;
      transition: all 0.3s ease;

      i{
        color: #fff;
      }

    }

  }
  .custom-next{
    width: 45px !important;
    height: 45px !important;
    background: #fff;
    border-radius: 100px;
    position: absolute;
    right: 10%;
    top: 100%;
    z-index: 2;
    transform: translate(0, -130%);
    transition: all 0.3s ease;
    @include breakpoint(medium) {
      right: 14%;
      top: 50%;
      transform: translate(0, -21%);
    }

    &:hover{
      background: #ff5722;
      transition: all 0.3s ease;

      i{
        color: #fff;
      }


    }
  }
  .swiper-slide {
    text-align: center;
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 30px;
    height: 30px;
    &::after {
      width: 30px;
      height: 30px;
      display: inline-block;
      border-radius: 50px;
      background: #00000042;
      font-size: 18px;
      text-align: center;
      margin: auto;
      line-height: 30px;
      font-weight: bolder;
      color: #fff;
    }
  }
}

</style>
