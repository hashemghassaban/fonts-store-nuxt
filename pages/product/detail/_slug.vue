<template>
  <client-only>
    <div>

    <div class="productDetail py-10">
      <section class="productDetail-banner">

        <v-carousel
          cycle
          class="carouselMain-desktop"
          height="580px"

        >
          <v-carousel-item v-for="(slide, i) in product?.images" :key="i">
            <nuxt-link :to="slide?.full_url">
              <v-sheet height="100%">
                <div class="slide-back">
                  <img
                    :src="

                      slide?.full_url +
                      '?width=auto&height=300'
                    "

                    alt="banner"
                    height="100%"
                    class="desktop"
                  />
                </div>
              </v-sheet>
            </nuxt-link>
          </v-carousel-item>
        </v-carousel>
        <v-carousel
          cycle
          class="carouselMain-mobile"
          height="250px"

        >
          <v-carousel-item v-for="(slide, i) in  product?.images" :key="i">
            <nuxt-link :to="slide.full_url">
              <v-sheet height="100%">
                <div class="slide-back">
                  <img
                    :src="

                      slide.full_url +
                      '?width=auto&height=300'
                    "

                    alt="banner"
                    height="100%"
                    class="desktop"
                  />
                </div>
              </v-sheet>
            </nuxt-link>
          </v-carousel-item>
        </v-carousel>
      </section>
      <section class="productDetail-description" >
        <div class="head-pro">
          <h1>{{product.name}}</h1>

          <button @click="scrollToBottom">
            <div class="icon">
              <SvgIcon
                name="arrow"
                color="#fff"
                size="12px"
                className="rounded-full"
              />
            </div>
            <span>   انتخاب نسخه و خرید</span>
          </button>
        </div>

        <p>{{product.short_description}}</p>
      </section>
      <section class="productDetail-fontPack" >
        <div class="fontPack-block">
          <div class="box" id="version"
               v-for="(item, index) in product?.prices"
          >
            <div class="box-head">
              <div class="weight">{{item.description}}</div>
              <div class="rate-and-type">
                <div class="types">{{item.name}}</div>
              </div>
            </div>
            <div class="box-body">
              <img :src="item?.preview_path" :alt="item.name">
            </div>
            <div class="box-footer">
              <div class="price">  {{  formatPrice(item.price) }} ت</div>
              <button class="add-to-cart"  @click="addToCart(item)">
                <SvgIcon
                  name="arrow"
                  color="#fff"
                  size="16px"
                  className="rounded-full"

                />
                خرید
              </button>
            </div>
          </div>

        </div>
      </section>
      <section class="productDetail-tiny-banners">
        <p>{{product.description}}</p>
      </section>
    </div>
      <section class="creator">
        <div class="pic">
          <img :src=" product?.designer?.avatar_url" :alt="product?.designer?.full_name">
          <h3> {{product?.designer?.full_name}}</h3>
        </div>
        <div class="info-creator">
          <h3> {{product?.designer?.full_name}}</h3>
          <p>{{product?.designer?.avatar_url}}</p>
        </div>

      </section>
      <section class="type-font">
        <p>{{product.short_description_2}}</p>
      </section>

    </div>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import TextInput from "@/components/TextInput/TextInput";
import SelectInput from "@/components/SelectInput/SelectInput";

import { productService } from '~/services'

export default {
  head: {
    titleTemplate: "",
    title: "لیست محصول ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "  لیست محصول - ",
    },
  ],
  components: {
    SvgIcon,
    TextInput,
    SelectInput
  },
  data () {
    return {
      searchText: '',
      itemsFilter: ['پربازدید ترین', 'پرفروش ترین', 'محبوب ترین', 'جدیدترین','ارزانترین','گرانترین'],
      filter: 'جدیدترین',
      page: 1,
      product:[],
      slides: [
        {url:'/',imagePath:'https://cdn.vuetifyjs.com/images/cards/docks.jpg'},
        {url:'/',imagePath:'https://cdn.vuetifyjs.com/images/cards/docks.jpg'},
        {url:'/',imagePath:'https://cdn.vuetifyjs.com/images/cards/docks.jpg'}
      ],


    }
  },
  methods: {

    formatPrice(value) {
      if(isNaN(value)) return  0
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    scrollToBottom() {
      const element = document.getElementById('version');
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    },
    async getProduct(id) {
      try {
        const product = await productService.getProduct(id)
        this.product = product?.entity?.product
      } catch (error) {
        console.error('خطا در دریافت محصول:', error)
      }
    },
    async addToCart(pro) {
      let body = {
        product_price: pro.id,
      };
      try {
        const data = await productService.postProduct(body)
        this.$store.commit('setCart', data)
        this.$store.commit('setDialogCart', true)
        this.$toast.success('محصول به سبد خرید اضافه شد')
      } catch (error) {
        console.error('خطا در دریافت محصول:', error)
      }
    },


  },
  computed: {
    currentPath() {

      return this.$route.params.slug
    },
  },
  mounted() {
    this.getProduct(this.currentPath);


  }
};
</script>

<style lang="scss" scoped>
.productDetail{
  padding: 0 5%;
  &-banner{
    height: 250px;
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    margin: auto;
    @include breakpoint(medium) {
      height: 500px;
    }
    img{
      width:100%;
      height: 100%;
      object-fit: fill;
    }
  }
  &-description{
    padding: 40px 5%;
    .head-pro{
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      @include breakpoint(medium) {
        flex-direction: row;
        gap: 20px;
      }
      h1{
        margin: 0;
        text-align: right;
      }
      button{

        width: 230px;
        background: #AAE73E;
        height: 54px;
        border-radius: 15px;
        border: 3px solid #fff;
        display: flex;
        padding:12px 7px;
        font-size: 18px;
        font-weight: 900;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover{
          background: #fff;
          transition: all 0.3s ease;

        }
        .icon{
          width: 35px;
          height: 35px;
          background: #000;
          text-align: center;
          border-radius: 50px;
          padding: 5px;
        }
        span{
          font-size: 16px;
          font-weight: 900;
          margin-left: 10px;
        }


      }
    }
    p{
      font-size: 15px;
      line-height: 30px;
      margin: 12px 0;
      color: #7D7D7D;
      text-align: justify;
      @include breakpoint(medium) {
        text-align: right;
      }
    }
  }
  &-tiny-banners{
    padding: 0 5%;
    .banners{
      &-block{
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
        margin: 100px 0 50px;
        padding: 0;


      }
      &-box{
        width: 50%;
        height: 250px;
        position: relative;
        @include breakpoint(medium) {
          height: 750px;
        }

        a{
          display: block;
          width: 100%;
          height: 100%;

          img{
            width: 100%;
            height: 100%;
            object-fit: fill;
            transition: all 0.3s ease;
            &:hover{
              filter: grayscale(100);
              transition: all 0.3s ease;
          }}

        }

      }
    }
    p{
      font-size: 15px;
      line-height: 30px;
      margin: 12px 0;
      color: #7D7D7D;
      text-align: justify;
      @include breakpoint(medium) {
        text-align: right;
      }
    }
  }
  &-fontPack{
    padding: 0 5%;
    .fontPack-block{
      display: flex;
      gap: 50px;
      flex-wrap: wrap;
      @include breakpoint(medium) {
        flex-wrap: nowrap;
        gap: 20px;
      }
      .box{
        flex: 100%;
        max-width: 100%;
        @include breakpoint(medium) {
          flex: 33.333%;
          max-width: 33.3333%;
        }
        &-head{
          display: flex;
          justify-content: space-between;
          flex-direction: row-reverse;
          background: #676767;
          margin-bottom: 11px;
          padding: 10px;
          height: 60px;
          border-radius: 10px;
          align-items: center;
          .weight{
            color: #C2C2C2;
          }
          .rate-and-type{
            display: flex;
            align-items: center;
            gap: 12px;
            .rate{
              img{
                width: 60px;
              }
            }
            .types{
              color: #fff;
            }
          }
        }
        &-body{
          height: 250px;
          @include breakpoint(medium) {
            height: 600px;
          }
          img{
            width: 100%;
            height: 100%;
            object-fit: fill;
          }
        }
        &-footer{
          display: flex;
          justify-content: space-between;
          background: #AAE73E;
          margin-top: 11px;
          padding: 10px 18px;
          height: auto;
          border-radius: 10px;
          align-items: center;
          @include breakpoint(medium) {
            flex-direction: row-reverse;
            height: 60px;
          }
          .add-to-cart{
            border: 2px solid #AAE73E;
            background: #AAE73E;
            border-radius: 10px;
            text-align: center;
            width: 100px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
            color: #fff;
            &:hover{
              background: #000;
              border: 2px solid #000;

              transition: all 0.3s ease;


            }

            i{
              margin-left: 5px;
            }
          }
          .price{
            font-size: 20px;
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

.creator{
  display: flex;
  gap: 30px;
  padding: 28px 5%;
  background: #EEE;
  flex-direction: column;
  @include breakpoint(medium) {
    flex-direction: row;
    padding: 70px 15%;

  }
  .pic{

    overflow: hidden;
    border-radius: 15px;
    display: flex;
    gap: 20px;
    align-items: center;
    @include breakpoint(medium) {
      min-width: 283px;
      min-height: 283px;
      width: 283px;
      display: inline-block;
      border: 1px solid #d6d6d6;
      gap:0;
    }
      img{
        min-width: 80px;
        min-height: 80px;
        width: 80px;
        height: 80px;
        object-fit: fill;
        overflow: hidden;
        border-radius: 10px;
        @include breakpoint(medium) {
          width: 100%;
          height: 100%;
          min-width: 100%;
          min-height: 100%;
        }

      }
    h3{
      color: #676767;


      display: inline-block;
      @include breakpoint(medium) {
        display: none;
      }
    }
  }
  .info-creator{
    padding: 0;
    @include breakpoint(medium) {
      padding: 40px 0;
    }
    h3{
      color: #676767;

      display: none;
      @include breakpoint(medium) {
        display: inline-block;
      }
    }
    p{
      font-size: 15px;
      line-height: 30px;
      margin:  0;
      color: #7D7D7D;
      text-align: justify;
      @include breakpoint(medium) {
        text-align: right;
        margin: 12px 0;
      }
    }
  }

}
.type-font{
  margin-top: 50px;
  margin-bottom: 0;
  padding: 0 5%;
  @include breakpoint(medium) {
    padding: 0 5%;
    margin-bottom: 100px;
    margin-top: 100px;

  }
  h3{
    color: #535353;
    display: block;
    width: 100%;
  }
  p{
    color: #AEAEAE;
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 40px;
    text-align: justify;
    @include breakpoint(medium) {
      text-align: right;
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
  .block-video {
    border: 0;
    height: auto;
    padding: 29px;
    background-color: #0000008f !important;
    border-radius: 8px !important;
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
  .slide-back img {

    border-radius: 15px;
    overflow: hidden;
  }

}


</style>
