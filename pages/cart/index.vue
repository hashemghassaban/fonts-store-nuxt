<template>
  <client-only>
    <section class="cart custom-container py-10">
      <div class="progress">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="cart"
              color="#F15A24"
              size="1.7rem"
              className="rounded-full"
            />
          </div>
          <h1 class="text">سبد خرید</h1>
        </div>
        <hr>
        <div class="title next">
          <div class="icon">
            <SvgIcon
              name="money"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h1 class="text">پرداخت</h1>
        </div>
        <hr>
        <div class="title next">
          <div class="icon">
            <SvgIcon
              name="money"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">خرید موفق</h2>
        </div>
      </div>


      <div class="cart-block">
        <div class="cart-block-list">
          <div class="pro">
            <div class="emptyProduct" v-if="cartItems?.length === 0">
              <img src="~/assets/img/icon/empty.png" alt="">
              <p>محصولی موجود نیست </p>
            </div>
            <div class="box" v-for="(item, index) in cartItems"  v-else>
              <Product :typeProduct="'cart'" :items="item"  @refreshData="refreshData"  :isNestedLink="true" />
            </div>


          </div>
        </div>
        <div class="cart-block-forms">
          <div class="block-info">
            <div class="discount">
              <div class="discount-field">
                <input type="text" placeholder="کد تخفیف" id="code" v-model="discount">
                <v-btn @click="applyCoupon" :loading="loadingDiscount">
                  <img src="~/assets/img/icon/starBuy.png" alt="">
                  <span>اعمال</span>
                </v-btn>
              </div>
            </div>

            <div class="totalPrice">
              <label for="code">جمع خرید : </label>
              <span> {{formatPrice(parseInt(cart?.total))}} ت</span>
            </div>
            <div class="totalPrice" v-if="cart?.discount > 0">
              <label for="code">  تخفیف حراج : </label>
              <span> {{formatPrice(parseInt(cart?.discount))}} ت</span>
            </div>
            <div class="totalPrice" v-if="cart?.coupon_price > 0">
              <label for="code">  کد تخفیف : </label>
              <span> {{formatPrice(parseInt(cart?.coupon_price))}} ت</span>
            </div>

            <div class="benefit-buy" >
              <label for="code"> قابل پرداخت : </label>
              <span> {{formatPrice(parseInt(cart?.payable))}} ت</span>
            </div>
          </div>
          <div class="warning-cart">
            <SvgIcon
              name="warning"
              color="#F15A24"
              size="20px"
              className="rounded-full"
            />
            <p>حتما قبل از پرداخت VPN را قطع کنید.</p>
          </div>
         <div class="submit">
           <v-btn @click="goToPayment()" :loading="loading" :disabled="cartItems?.length === 0">
             <div class="icon">
               <SvgIcon
                 name="arrow"
                 color="#fff"
                 size="12px"
                 className="rounded-full"
               />
             </div>
             <span>تکمیل خرید و پرداخت</span>
           </v-btn>
         </div>
        </div>
      </div>
    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { cartService  } from '~/services'

export default {
  head: {
    titleTemplate: "",
    title: " سبد خرید - لاینو تایپ ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: " سبد خرید - لاینو تایپ ",
    },
  ],
  components: {
    SvgIcon,
  },
  data () {
    return {
      discount:"",
      loadingDiscount:false,
      loading:false,
      cartItems:[],
      cart:[],
    }
  },

  computed: {
    authenticate() {
      if (process.client) {
        return !!window.localStorage.getItem("token");
      }
    },

  },
  methods: {
    refreshData(newValue) {
    if(newValue ){
      this.getCart()
    }
    },
    formatPrice(value) {
      if(isNaN(value)) return  0
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async applyCoupon(){
      if(!this.authenticate){
        this.$router.push('/signIn')
        localStorage.setItem('lastUrL' , '/cart')
      }else{
      if(this.discount === ""){
        this.$toast.error('فیلد کد تخفیف نباید خالی باشد', {
          timeout: 4000,
        })
      }else{
        this.loadingDiscount = true;

        let body = {
          "coupon":this.discount
        }
        try {
        let data = await cartService.applyCoupon(body)
          this.cart = data.entity?.cart
          this.$toast.success(data?.message, {
            timeout: 4000,
          })
          this.loadingDiscount = false;
        } catch (error) {
          this.$toast.error(error, {
            timeout: 4000,
          })
          this.loadingDiscount = false;
        }
      }
      }
    },
    goToPayment(){
      if(!this.authenticate){
        this.$router.push('/signIn')
       localStorage.setItem('lastUrL' , '/cart')
      }else{
        this.loading = true;
        this.$router.push('/checkout')

        setTimeout(()=>{
          this.loading = false;
        },1000)

      }

    },
    async getCart() {
      if(!this.authenticate){
        this.cartItems = this.$store.state.cart.items
        this.cart = this.$store.state.cart
      }else{
        try {
          const res = await cartService.getCart()
          this.cart = res.entity?.cart
          this.cartItems = res.entity?.cart?.items
          this.$store.commit('setCart', res.entity?.cart)


        } catch (error) {
          this.$toast.error(error, {
            timeout: 4000,
          })
        }
      }

    },


  },
  beforeMount() {
    this.getCart()
    if ((!this.authenticate && this.cart?.items === undefined) ) {
      this.$router.push('/signIn')
    }
  },


};
</script>

<style lang="scss" scoped>

.progress{
  display: flex;
  width:100%;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
  padding: 0 25px;
  @include breakpoint(medium) {
    width: 500px;
    padding: 0;
    margin-bottom: 40px;
  }
  .title{
    display: flex;
    flex-direction: column;
    gap: 0;
    @include breakpoint(medium) {
      flex-direction: row;
      gap: 20px;
    }
    &.next{
      opacity: 0.3;
      filter: grayscale(100);
    }
  }

  hr{
    border: 1px dashed #d8d8d8;
    flex-grow: 1;
    margin-right: 8px;
    margin-left: 8px;
  }

  .text{
    font-size: 15px;
    @include breakpoint(medium) {
      font-size: 20px;
    }
  }
}
.emptyProduct{
  width: 315px;
  height: 230px;
  margin: auto;
  text-align: center;
  p{
    font-size: 20px;
    font-width: bold;
  }
}
.cart{

&-block{
  display: flex;
  padding: 40px 5%;
  gap: 0;
  flex-direction: column-reverse;
  @include breakpoint(medium) {
    flex-direction: row;
    gap: 30px;
  }

  &-list{
      flex: 100%;
    max-width: 100%;

    @include breakpoint(medium) {
      flex: 50%;
      max-width: 50%;
    }
    .pro{
      .box{
        margin: 0 0 25px;
        @include breakpoint(medium) {
          margin: 0;
        }
      }
    }
  }
  &-forms{
    flex: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    @include breakpoint(medium) {
      flex: 50%;
      max-width: 50%;
    }
    .block-info{
      background: #F4F4F4;
      border-radius: 15px;
      padding: 15px;
      width: 100%;
      margin: auto;
      @include breakpoint(medium) {
        width: 510px;
      }
      .discount{
        display: flex;
        align-items: center;
        gap: 13px;
        label{
          font-weight: 700;
          width: 150px;
        }
        &-field{
          display: flex;
          width: 100%;
          input{
            background: #fff;
            margin: 0;
            height: 50px;
            width: 100%;
            border-radius: 0 10px 10px 0;
            padding: 0 15px
          }
          button{
            border: 2px solid #F15A24;
            background: #F15A24;
            border-radius: 10px 0 0 10px;
            text-align: center;
            width: 100px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            gap: 10px;
            @include breakpoint(medium) {
              width: 180px;
            }
            &.v-btn--loading{
              background: #fff;

            }
            &:hover{
              background: #000;
              border: 2px solid #000;
              transition: all 0.3s ease;

            }
            span{
              color: #fff;
            }
            img{
              margin-left: 5px;
              width: 30px;
            }
          }
        }

      }
      .totalPrice{
        display: flex;
        margin: 20px 0;
        align-items: center;
        justify-content: space-between;
        label{
          font-weight: 700;
        }
        span{
          font-weight: 700;
        }

      }
      .benefit-buy{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 20px;
        label{
          color: #F15A24;
          font-weight: 700;
        }
        span{
          color: #F15A24;
          font-weight: 700;
        }
      }
    }
    .warning-cart{
      display: flex;
      align-items: center;
      gap: 15px;
      justify-content: flex-start;
      margin: 12px 0;
      @include breakpoint(medium) {
        margin: 12px 110px;
      }
      p{
        color: #F15A24;
        font-size: 15px;
      }
    }
    .submit{
      padding: 0 0;
      @include breakpoint(medium) {
        padding: 0 100px
      }
      button{
        width: 100%;
        background: #AAE73E;
        height: 54px;
        border-radius: 15px;
        border: 3px solid #AAE73E;
        display: flex;
        padding:12px 7px;
        font-size: 18px;
        font-weight: 900;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s ease;
        &.v-btn--disabled{
          border: 3px solid #ccc;
          background: #ccc;
          opacity: 0.4;
        }

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
          padding: 3px 0;
        }
        span{
          font-size: 16px;
          font-weight: 900;
          margin-left: 10px;
        }


      }
    }

  }

}

}
</style>
