<template>
  <client-only>
    <div>
      <Loading v-if="loading" />

    <div class="productDetail py-10">
      <section class="productDetail-banner">
        <v-btn icon class="heart"
               @click="toggleHeart(product)">
          <SvgIcon
            name="heart1"
            color="#F44336"
            v-if="product?.is_favourited"
            size="28px"
            className="rounded-full"
          />
          <SvgIcon
            name="heart"
            color="#fff"
            size="25px"
            v-else
            className="rounded-full"
          />

        </v-btn>

        <v-carousel
          cycle
          class="carouselMain-desktop"
          height="500px"

        >
          <v-carousel-item v-for="(slide, i) in product?.images" :key="i">
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
          <div class="titles">
            <div class="percent"  v-if="product?.lowest_price?.has_offer">
              <span>{{ product?.lowest_price?.offer_percent }}</span>
            </div>
            <h1>{{product.name}}</h1>
          </div>
          <button @click="scrollToBottom">
            <div class="icon">
              <SvgIcon
                name="arrow"
                color="#fff"
                size="12px"
                className="rounded-full"
              />
            </div>
            <span>انتخاب نسخه و خرید</span>
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
              <div class="price">
                <span v-if="item?.offer_price !==  item?.price && item?.has_offer && item?.offer_price && item?.price!== 0 " class="isOldPrice">{{  formatPrice(item?.price) }} ت</span>
                <b>  {{ item?.has_offer ? formatPrice(item?.offer_price) : formatPrice(item?.price) }} ت  </b>

              </div>
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
        <h3>معرفی محصول : </h3>
        <p v-html="product.description"></p>
      </section>
    </div>
      <section class="creator">
        <nuxt-link :to="'/designer/detail/' + product?.collection_id" class="pic">
          <img :src=" product?.collection?.icon_url" :alt="product?.collection?.title">
          <h3> {{product?.collection?.title}}</h3>
        </nuxt-link>
        <nuxt-link :to="'/designer/detail/' + product?.collection_id" class="info-creator">
          <h3> {{product?.collection?.title}}</h3>
         <div v-html="product?.collection?.description"></div>
        </nuxt-link>
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
  components: {
    SvgIcon,
    TextInput,
    SelectInput
  },
  data () {
    return {
      searchText: '',
      itemsFilter: [
        { name: 'پربازدید ترین', value: 1 },
        { name: 'پرفروش ترین', value: 2 },
        { name: 'جدیدترین', value: 4 },
        { name: 'ارزانترین', value: 5 },
        { name: 'گرانترین', value: 6 }
      ],
      filter: 'جدیدترین',
      page: 1,
      product:[],
      title:'',
      description:'',
      loading:false,
    }
  },
  methods: {
    async toggleHeart(item) {
      if (!this.authenticate) {
        let url  = ""
        if (process.client) {
          url = window.location?.pathname
        }
        localStorage.setItem('lastUrL' , url)
        this.$router.push('/signIn')
        return
      }
      try {
        if (item.is_favourited)
          await productService.dislikeProduct(item.id)
        else await productService.likeProduct(item.id)
        item.is_favourited = !item.is_favourited
        this.getProduct(this.currentPath);
      } catch (e) {}
    },
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
      this.loading = true
      try {
        const product = await productService.getProduct(id)
        this.product = product?.entity?.product
        this.description =  product?.entity?.product?.seo?.description
        this.title =  product?.entity?.product?.seo?.title

        this.loading = false
      } catch (error) {
        this.loading = false

        this.$toast.error(error, {
          timeout: 4000,
        })
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
        this.$toast.error(error, {
          timeout: 4000,
        })
      }
    },


  },
  computed: {
    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem("token");
      }
    },
    currentPath() {

      return this.$route.params.slug
    },
  },
  mounted() {
    this.getProduct(this.currentPath);
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.title + ' -  ' ,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.product.thumbnail?.small_full_url,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.description,
        },
      ],
    }
  },
};
</script>

<style lang="scss" scoped>
.heart{
  position: absolute;
  top: 20px;
  cursor: pointer;
  left: 20px;
  width: 42px;
  height: 42px;
  text-align: center;
  border-radius: 100px;
  line-height: 35px;
  z-index: 1;
  background: inherit;
  border: 0;
  box-shadow: none;
  padding: 0;
  min-width: 35px;
  @include breakpoint(medium) {
    left: 20px;
  }
  i{
    color:red!important;
  }
}
.productDetail{
  padding: 0 5%;
  &-banner{
    height: 250px;
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    margin: auto;
    position: relative;
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
      padding: 0 0 15px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      @include breakpoint(medium) {
        flex-direction: row;
        gap: 20px;
        padding: 15px;
      }
      .titles{
        margin: 0;
        text-align: right;
        display: flex;
        align-items: center;

        .percent{
          width: 80px;
          height: 80px;
          position: relative;
          background:url("~/assets/img/icon/star.png");
          background-size: contain;
          background-repeat: no-repeat;
          margin-left: 7px;
          @include breakpoint(medium) {
            width: 80px;
            height: 80px;
            margin-left: 20px;
          }
          img{
            filter: grayscale(0)!important;

          }
          span{
            position: absolute;
            right: 13px;
            top: 15px;
            font-size: 15px;
            font-weight: 700;
            @include breakpoint(medium) {
              right: 23px;
              top: 21px;
              font-size: 24px;
            }


          }
        }

        h1{
          font-size: 18px;
          @include breakpoint(medium) {
            font-size: 20px;
          }
        }
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
    h3{
      margin-top: 40px;
      font-size: 20px;
      font-weight: bold;
      @include breakpoint(medium) {
        font-size: 25px;
      }
    }
    ::v-deep{
      img{
        width: 100%!important;
        height: auto!important;
      }
    }


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
          height: auto;
          @include breakpoint(medium) {
            height: auto;
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
            .isOldPrice{
              color: #00000061;
              text-decoration-line: line-through;
              margin: 0 15px;
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
      height: 283px;
      display: inline-block;
      border: 1px solid #d6d6d6;
      gap:0;
    }
      img{
        min-width: 80px;
        min-height: 80px;
        width: 80px;
        height: 80px;
        object-fit: cover;
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
  .slide-back{
    height: 100%;
  }
  .slide-back img {
    border-radius: 15px;
    overflow: hidden;
    object-fit: cover;
  }
}
</style>
