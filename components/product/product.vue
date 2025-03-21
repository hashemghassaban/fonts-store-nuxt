<template>
  <div class="product">
<div class="product-list">

  <div class="product-list-top" >
    <v-btn icon class="heart" v-if="typeProduct !== 'profile' && typeProduct !== 'successBuy'  &&  typeProduct !== 'favorite'"
         @click="toggleHeart(items)">
      <SvgIcon
        name="heart1"
        color="#F44336"
        v-if="items?.is_favourited"
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
    <nuxt-link :to="typeProduct === 'successBuy'  ? '/product/detail/' +items?.product_id : isNestedLink ? '/product/detail/' +items?.product?.id : '/product/detail/'+items?.id ">
    <div class="background" :class="typeProduct === 'noProduct ' ? '':'noProduct '">
      <img :src="items?.thumbnail?.full_url || items?.product?.thumbnail?.full_url" :alt="items?.product?.name">
      <div class="percent" v-if="(typeProduct === 'product' || typeProduct === 'noProduct ') && (items?.lowest_price?.has_offer && items?.discount_percent !== 0) " >
        <img src="~/assets/img/icon/star.png" alt="">
        <span>{{ typeProduct === 'product' || typeProduct === 'noProduct' ? items?.lowest_price?.offer_percent:items?.discount_percent+'%'}}</span>
      </div>
    </div>
    </nuxt-link>
    <v-btn :loading="loadingBtn && items?.id === selectId" class="download-file" v-if="typeProduct === 'profile' || typeProduct === 'successBuy'" @click="download(items?.id)">
      <div class="icon">
        <SvgIcon
          name="download"
          color="#fff"
          size="18px"
          className="rounded-full"
        />
      </div>
      <span>دانلود فونت</span>
    </v-btn>
  </div>
  <div class="product-list-bottom">
    <div class="title">
    <h3>  {{items?.name || items?.product?.name}}</h3>
      <div class="type" v-if=" typeProduct === 'cart'">
        <b>{{items?.item_price?.name}}</b>
        <span> {{ items?.item_price?.description }} </span>
      </div>
    </div>
    <div class="action-product" >
      <v-btn icon  v-if="(typeProduct === 'cart' || typeProduct === 'favorite')"   @click="remove(items.id , typeProduct)">

        <SvgIcon

          name="trash"
          color="#FF0000"
          size="18px"
          className="trash"

        />
      </v-btn>

      <v-btn v-if="typeProduct !== 'profile' && typeProduct !== 'successBuy' && (typeProduct !== 'cart' && typeProduct !== 'favorite') " @click="addToCart(items)" :loading="loading">
        <SvgIcon
          name="arrow"
          color="#fff"
          size="13px"
          className="rounded-full"
        />
        <span>خرید</span>
      </v-btn>
      <div class="price" v-if="typeProduct === 'product' || typeProduct === 'cart' || typeProduct === 'successBuy' || (typeProduct === 'profile' && typeProduct !== 'favorite')">
        <div class="price-main">
          <span v-if="items?.prices?.length > 1">  از</span>
          {{typeProduct === 'product' ? formatPrice(items?.lowest_price?.offer_price) : typeProduct === 'noProduct' ? formatPrice(items?.lowest_price?.price): formatPrice(items?.payable_price)}} ت

        </div>
        <div class="price-old" v-if="((typeProduct === 'product' || typeProduct === 'cart' || typeProduct === 'profile' || typeProduct === 'successBuy') && (!!items?.lowest_price?.has_offer  || items?.price!==items?.payable_price))">
          {{typeProduct === 'cart'  ||  typeProduct === 'successBuy'?  formatPrice(items?.price) :formatPrice(items?.lowest_price?.price)}} ت
        </div>


      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import {  productService } from '~/services'

export default {
  data() {
    return {
      isActive: false,
      loading:false,
      selectId : 0,
      loadingBtn:true,
    }
  },
  components: {
    SvgIcon,

  },
  props: {
    typeProduct: {
      type: String,
      default: null,
    },
    items:{},
    isNestedLink: false,

  },
  methods: {

    async download(id) {
      this.selectId = id
      this.loadingBtn = true;
      try {
        let data = await productService.download(id)
        window.open(data?.entity?.link, '_blank');
        this.loadingBtn = false
      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
        this.loadingBtn = false
      }
    },
    formatPrice(value) {
      if(isNaN(value)) return  0
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
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
        this.$emit('refreshData', true);
      } catch (e) {}
    },
    async addToCart(pro) {
      this.loading = true
      let body = {
        product_price: pro.prices[0].id,
      };
      try {
        const data = await productService.postProduct(body)
        this.$store.commit('setCart', data)
        this.$store.commit('setDialogCart', true)
        this.$toast.success('محصول به سبد خرید اضافه شد')
        this.loading = false;
      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
        this.loading = false;
      }
    },

    async remove(id , type){
      if(type === 'cart'){
        try {

          await productService.removePro(id)
          this.$emit('refreshData', true);


        } catch (error) {
          this.$toast.error(error, {
            timeout: 4000,
          })
        }
      }else{
        try {

          await productService.dislikeProduct(id)
          this.$emit('refreshData', true);


        } catch (error) {
          this.$toast.error(error, {
            timeout: 4000,
          })
        }
      }

    },

  },
  computed: {
    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem("token");
      }
    },

  },

}
</script>
<style scoped lang="scss">
.product{
  position: relative;
  background: #eeeeee;
  border-radius: 10px;
  overflow: hidden;
  @include breakpoint(medium) {
    background: inherit;
  }
  &-list{
    &:hover{
      img{
        filter: grayscale(100);
        transition: all 0.3s ease;
      }
      .title{
        h3{
          color: #ff5722!important;
          transition: all 0.3s ease;
        }
      }
    }
    &-top{
      border-radius: 10px;
      overflow: hidden;
      @include breakpoint(medium) {
        border: 1px solid #ccc;
      }
      .heart{
        position: absolute;
        top: 10px;
        cursor: pointer;
        left: 10px;
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
          top: 20px;
        }
        i{
          color:red!important;
        }
      }
      .background{
        height: 414px;
        width: 100%;
        overflow: hidden;
        position: relative;

        &.noProduct {
          height: 180px;
          @include breakpoint(medium) {
            height: 290px;
          }
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }
        .percent{
          width: 50px;
          height: 50px;
          position: absolute;
          right: 10px;
          bottom: 15px;
          background:url("~/assets/img/icon/star.png");
          background-size: contain;
          background-repeat: no-repeat;
          @include breakpoint(medium) {
            width: 100px;
            height: 100px;
            right: 20px;
            bottom: 22px;
          }
          img{
            filter: grayscale(0)!important;

          }
          span{
            position: absolute;
            right: 10px;
            top: 15px;
            font-size: 15px;
            font-weight: 700;
            @include breakpoint(medium) {
              right: 33px;
              top: 34px;
              font-size: 24px;
            }


          }
        }
      }
    }
    .download-file{
      right: 50%;
      top: 50%;
      transform: translate(50%, -100%);
      width: 150px;
      background: #AAE73E;
      height: 40px;
      border-radius: 10px;
      border: 3px solid #fff;
      position: absolute;
      display: flex;
      padding:5px 7px;
      font-size: 18px;
      font-weight: 900;
      margin-left: 20px;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      @include breakpoint(medium) {
        width: 200px;
        height: 54px;
        padding:12px 7px;
      }
      &:hover{
        background: #fff;
      }
    .icon{
      width: 30px;
      height: 30px;
      background: #000;
      text-align: center;
      border-radius: 10px;
      padding: 4px;
      @include breakpoint(medium) {
        width: 40px;
        height: 40px;
        padding: 8px;
      }
    }
      span{
        font-size: 13px;
        font-weight: 900;
        margin-left: 20px;
        @include breakpoint(medium) {
          font-size: 18px;
        }
      }

    }
    &-bottom{
      display: flex;
      justify-content: space-between;
      height: auto;
      padding:  10px;
      flex-direction: column;
      @include breakpoint(small) {
        height: 75px;
        flex-direction: row;
        padding: 0 10px
      }
      .title{
        font-weight: 800;
        font-size: 18px !important;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 0;
        width: 100%;
        @include breakpoint(medium) {
          width: 54%;
        }
        h3{

          font-size: 15px !important;
          margin: 0;
          @include breakpoint(medium) {
            font-size: 18px !important;
            height: 30px;
            line-height: 30px;

          }
        }
        .type{
          display: flex;
          align-items: center;
          gap: 14px;

          img{
            height:  15px;
          }
          span{
            font-size: 15px;
            color: #C2C2C2;
            font-weight: 100;

          }
          b{
            font-size: 15px;
            color: #C2C2C2;
          }
        }

      }
      .action-product{
        display: flex;
        align-items: center;
        flex-direction: column-reverse;
        @include breakpoint(medium) {
          flex-direction: row-reverse;

        }
        .font-trash{
          position: absolute;
          right: 0;
          bottom: 0;
          @include breakpoint(medium) {
            position: static;

          }
        }
        p{
          font-size: 14px;
          color: #a5a5a5;
          @include breakpoint(medium) {
            font-size: 16px !important;

          }
        }
        .font-trash{
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover{
            color: #ccc;
            transition: all 0.3s ease;
            &:before{
              color: #ccc;
            }
          }
        }
        .v-btn{
          width: 100%;
          height: 45px;
          background: #17190D;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          border: 2px solid #17190D;
          box-shadow: none;
          overflow: hidden;
          transition: all 0.3s ease;
          border-radius: 10px;
          @include breakpoint(medium) {
            width: 100px;
            height: 40px;
            gap: 20px;
          }


          &:hover{
            background: #fff;
            border: 2px solid #ff5722;
            transition: all 0.3s ease;

            span{
              color: #000;
            }
            i{
              color: #ff5722!important;
              &:before{
                color: #ff5722!important;
              }
            }
          }
          &.v-btn--loading{
            background: #fff;
            border: 2px solid #ff5722;
            overflow: hidden;
            ::v-deep{
              .v-progress-circular{
                svg{
                  circle{
                    stroke: #ff5722;
                  }
                }
              }
            }

          }
          img{
            margin-left: auto;
            width: 15px;
          }
          span{
          color: #fff;
            display: inline-block;

          }
        }
        .price{
          display: flex;
          align-items: center;
          margin: 10px 0;
          gap: 10px;
          font-size: 15px;
          flex-direction: row-reverse;
           width: 100%;
          padding: 0 10px;
          @include breakpoint(medium) {
            margin: 25px 14px;
            font-size: 18px;
            gap: 17px;
            padding: 0;

          }
          &-main{
            font-weight: bold;
            span{
              font-weight: 100;
              font-size: 15px;
              margin-left: 5px;
              color: #17190d;
            }
          }
          &-old{
            color: #A1A1A1;
            font-weight: bold;
            font-size: 15px;
            text-decoration-line: line-through;
          }
        }
      }
    }
  }
  .v-btn--icon{
    background: inherit !important;
    border: 0 !important;
    width: 42px !important;
  }
}


</style>
