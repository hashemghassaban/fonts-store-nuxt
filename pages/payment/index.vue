<template>
  <client-only>
    <section class="cart custom-container py-10">
      <div class="progress">
        <nuxt-link to="/cart" class="title">
          <div class="icon">
            <SvgIcon
              name="cart"
              color="#AAE73E"
              size="1.7rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">سبد خرید</h2>
        </nuxt-link>
        <hr>
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="money"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">پرداخت</h2>
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
            <div class="box">
              <Product :typeProduct="'cart'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'cart'"/>
            </div>
          </div>
        </div>
        <div class="cart-block-forms">
          <div class="payment-method">
              <h3 class="title">انتخاب روش پرداخت</h3>
              <v-radio-group v-model="paymentMethod" mandatory>
                <v-row>
                  <v-col cols="12" >
                    <v-radio
                      value="1"
                      label="پرداخت آنلاین"
                      color="primary"
                    ></v-radio>
                    <p class="text">از طریق کارت های اعتباری بانکی</p>
                    <div class="gateway-select" v-if="paymentMethod === '1'">
                      <div class="gateway-options">
                        <div
                          v-for="gateway in gateways"
                          :key="gateway.id"
                          :class="{ 'gateway-item': true, 'active': selectedGateway === gateway.id }"
                          @click="selectedGateway = gateway.id"
                        >
                          <img
                            src="~/assets/img/element/zarinpall.jpg"
                            :alt="gateway.name"
                            loading="lazy"
                          />

                        </div>
                      </div>

                    </div>
                  </v-col>

                  <v-col cols="12">
                    <v-radio
                      value="2"
                      label="کیف پول"
                      color="primary"
                    ></v-radio>
                    <p class="text">موجودی : 10.000 ت</p>
                    <p class="amount">میزان کسری از کیف پول : 10.000 ت</p>
                  </v-col>
                </v-row>
              </v-radio-group>

          </div>
          <div class="block-info">
            <div class="totalPrice">
              <label>جمع خرید : </label>
              <span>130.000 ت</span>
            </div>
            <div class="benefit-buy">
              <label> سود شما از خرید : </label>
              <span>130.000 ت</span>
            </div>
            <div class="totalPayment">
              <label> قابل پرداخت : </label>
              <span>200.000 ت</span>
            </div>
          </div>
         <div class="submit">
           <button >
             <div class="icon">
               <SvgIcon
                 name="arrow"
                 color="#fff"
                 size="12px"
                 className="rounded-full"
               />
             </div>
             <span> پرداخت</span>
           </button>

         </div>

        </div>


      </div>
    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  head: {
    titleTemplate: "",
    title: "پرداخت",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: " پرداخت - ",
    },
  ],
  components: {
    SvgIcon,
  },
  data () {
    return {
      paymentMethod: '1',
      gateways: [
        { id: 1, name: 'زرین پال' , url:'zarinpall' },
      ],
      activeButton: null,
      selectedGateway: 1,
    }
  },
  methods: {


  }
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
    .payment-method{
      background: #fff;
      border-radius: 15px;
      padding: 15px;
      width: 100%;
      border: 1px solid #d6d6d6;
      margin: 0 auto 24px;
      @include breakpoint(medium) {
        width: 510px;
      }
      .title{
        margin: 0;
        text-align: right;
        display: block;
        font-size: 16px !important;
        font-weight: 700;
      }
      .text{
        font-size: 13px;
        color: #a1a1a1;
        text-align: right;
        padding: 0 31px;
      }
      .amount{
        font-size: 13px;
        color: #ff5722;
        text-align: right;
        padding: 8px 30px;
      }
    }
    .block-info{
      background: #F4F4F4;
      border-radius: 15px;
      padding: 15px;
      width: 100%;
      margin: 0 auto 20px;
      @include breakpoint(medium) {
        width: 510px;
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
      .totalPayment{
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
      .benefit-buy{
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
          border: 3px solid #AAE73E;
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

  }

}

}
.gateway-select {
  margin-top: 20px;
  padding: 0 32px;
}
.gateway-options {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}
.gateway-item {
  padding: 0 7px;
  border: 2px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  width: 120px;
  height: 40px;
  transition: all 0.3s ease;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.gateway-item:hover {
  border: solid 2px #bebebe;

}
.gateway-item.active {
  background-color: #fff;
  color: #f15a24;
  border-color: #626262;
}
.selected-gateway {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

::v-deep{
  .v-label{
    font-size: 15px;
    font-weight: 800;
  }
}
</style>
