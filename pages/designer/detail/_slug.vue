<template>
  <client-only>
    <div>
      <Loading v-if="loading" />

    <div class="productDetail py-10">
      <section class="creator">
        <div class="pic">
          <img :src=" designer?.designer?.avatar_url" :alt="designer?.designer?.full_name">
          <h3> {{designer?.designer?.full_name}}</h3>
        </div>
        <div class="info-creator">
          <h1> {{designer?.designer?.full_name}}</h1>
          <p>{{designer?.designer?.description}}</p>
        </div>

      </section>
      <section class="productMain-lists">
        <div class="productMain-lists-block"  v-if="product?.length > 0">
          <div class="latest-font-block">
            <div class="box" v-for="(item, i) in product" >
              <Product :typeProduct="'product'" :items="item" @refreshData="refreshData"/>
            </div>

          </div>
          <v-pagination
            v-model="page"
            :length="Math.ceil(totalItems / itemsPerPage)"
            :total-visible="7"
            class="my-4"
            @input="getCategory"
          ></v-pagination>
        </div>
        <div class="productMain-lists-block not-pro"  v-else>

          <img src="~/assets/img/icon/not-pro.png" alt="not pro">
          <span>  دسته ای یافت نشد</span>
        </div>
      </section>
      <section class="productDetail-tiny-banners">
        <p v-html="product.description"></p>
      </section>
    </div>
      <section class="type-font">
        <p v-html="product.short_description_2"></p>
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
      filter: 1,
      sort:1,
      page: 1,
      product:[],
      designer:[],
      totalItems:0,
      loading:false,
      itemsPerPage: 10,



    }
  },
  watch: {
    itemsPerPage(newVal) {
      this.page = 1 // Reset page when itemsPerPage changes
      this.getProductAll()
    },
  },
  methods: {
    refreshData(newValue) {
      if(newValue ){
        this.getProductAll(this.sort)
      }
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
    async getProductAll() {
      this.loading = true;
      const data = {
        collection : this.currentPath,
      }
      try {
        const product = await productService.getProductAll(data)
        this.product = product?.entity?.data
        this.designer = product?.entity?.data[0]
        this.totalItems = this.product?.total
        this.loading = false;

      } catch (error) {
        this.loading = false;
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
    this.getProductAll(this.currentPath);


  },
  head() {
    return {
      title: this.designer.title,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.designer?.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.designer?.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.designer?.title + ' -  ' ,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.designer.icon,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.designer?.description,
        },
      ],
    }
  },
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
  border-radius: 10px;
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
    h1{
      color: #676767;
      font-size: 20px;
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
.productMain{
  padding: 0 0;
  @include breakpoint(medium) {
    padding: 0 10%;
  }
  &-lists{
    padding:0 10%;
    &-filter{
      display: flex;
      justify-content: space-between;
      .filter{
        width: 130px;
        @include breakpoint(medium) {
          width: 250px;
        }

        .v-input{
          border-radius: 10px;
          width: 150px;
          font-size: 15px;
          @include breakpoint(medium) {
            width: 248px;
            font-size: 12px;
          }
          ::v-deep{
            .v-icon{
              display: none;
            }
            .v-input__slot{
              min-height: 51px;
              height: 51px;
            }
          }


        }
      }
    }
    .searchBlock{
      position: relative;
      z-index: 1;
      width: 200px;
      @include breakpoint(medium) {
        width: 650px;
      }
    }
    .expanding-search {
      transition: max-width 0.3s ease-in-out;
      background: rgb(255 255 255)!important;
      padding: 0!important;

      .v-input__slot{
        background: rgb(255 255 255)!important;


      }


    }
    ::v-deep{
      .v-text-field--filled > .v-input__control > .v-input__slot {
        background:#fff!important;
        padding: 0 10px!important;
        border: 1px solid #646464;
        min-height: 50px!important;
        height: 50px!important;
        border-radius: 10px;

      }
      .v-icon{
        font-size: 27px;
        position: relative;
        top: 4px;
      }
      .v-text-field__slot{
        padding: 0 15px!important;
      }

    }
    &-block{

    }
  }
  .not-pro{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 100px 0;
    width: 100%;
    margin: 60px auto 100px;
    border: 1px solid #ccc;
    border-radius: 10px;
    span{
      font-weight: 800;
      color: #ff7a00 !important;
      margin-top: 15px;
      text-align: center;
    }
  }
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
}
.latest-font-block{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 50px;
  .box{
    margin-bottom: 30px;
    flex: 100%;
    max-width: 100%;
    @include breakpoint(medium) {
      flex: 50%;
      max-width: 49%;
    }
  }
}
::v-deep {
  .v-progress-circular {
    margin: auto;
    display: block;
    margin-top: 148px;
  }

}

</style>
