<template>
  <div class="product">
<div class="product-list">

  <div class="product-list-top" >
    <div class="heart" v-if="typeProduct !== 'profile'"  :class="{ 'is-active': isActive }"
         @click="toggleHeart">
      <SvgIcon
        name="heart"
        color="#fff"
        size="25px"
        v-if="!isActive"
        className="rounded-full"
      />
      <SvgIcon
        name="heart1"
        color="#F44336"
        v-if="isActive"
        size="28px"
        className="rounded-full"
      />
    </div>
    <nuxt-link to="/productDetail">
    <div class="background" :class="typeProduct === 'no-product' ? '':'no-product'">
      <img src="~/assets/img/banner/product.jpg" alt="">
      <div class="percent" v-if="typeProduct === 'product'">
        <img src="~/assets/img/icon/star.png" alt="">
        <span>%20</span>
      </div>
    </div>
    </nuxt-link>
    <div class="download-file" v-if="typeProduct === 'profile'">
      <div class="icon">
        <SvgIcon
          name="download"
          color="#fff"
          size="18px"
          className="rounded-full"
        />
      </div>
      <span>دانلود فونت</span>
    </div>
  </div>
  <div class="product-list-bottom">
    <div class="title">
    <h3>  فونت اسپیک</h3>
      <div class="type" v-if=" typeProduct === 'cart'">
        <img src="~/assets/img/icon/version-1.png" alt="">
        <b>نسخه پایه</b>
        <span> 3 وزن </span>
      </div>
    </div>
    <div class="action-product" >
      <SvgIcon
        v-if="typeProduct === 'cart'"
        name="trash"
        color="#FF0000"
        size="18px"
        className="trash"
      />
      <button v-if="typeProduct !== 'profile' && typeProduct !== 'cart'">
        <SvgIcon
          name="arrow"
          color="#fff"
          size="13px"
          className="rounded-full"
        />
        <span>خرید</span>
      </button>
      <p v-if=" typeProduct === 'profile'">نسخه 10.6 | 1403/06/03</p>
      <div class="price"  v-if="typeProduct === 'product' || typeProduct === 'cart' || typeProduct !== 'profile'">
        <div class="price-main">
          150.000 ت
        </div>
        <div class="price-old">
          180.000 ت
        </div>
      </div>
    </div>
  </div>



</div>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  data() {
    return {
      isActive: false
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
  },
  methods: {
    toggleHeart() {
      this.isActive = !this.isActive
    }
  }
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
      .heart{
        position: absolute;
        top: 20px;
        cursor: pointer;
        left: 20px;
        width: 35px;
        height: 35px;
        background: #17190d33;
        border-radius: 50px;
        text-align: center;
        line-height: 50px;
        z-index: 1;
        @include breakpoint(medium) {
          left: 20px;


        }
        &.is-active {
          i{
            color:red!important;
          }

        }
      }
      .background{
        height: 414px;
        width: 100%;
        border-radius: 15px;
        overflow: hidden;
        position: relative;

        &.no-product{
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
            right: 8px;
            top: 12px;
            font-size: 18px;
            direction: ltr;
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
        font-size: 15px;
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
        h3{
          height: 30px;
          line-height: 30px;
          font-size: 15px !important;
          margin: 0;
          @include breakpoint(medium) {
            font-size: 18px !important;
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
          right: 20px;
          bottom: 25px;
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
        button{
          width: 100%;
          height: 45px;
          background: #17190D;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 13px;
          border: 2px solid #17190D;
          transition: all 0.3s ease;
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
          @include breakpoint(medium) {
            margin: 25px 14px;
            font-size: 18px;
            gap: 17px;

          }
          &-main{
            font-weight: bold;
          }
          &-old{
            color: #A1A1A1;
            font-weight: bold;
          }
        }
      }
    }
  }
}


</style>
