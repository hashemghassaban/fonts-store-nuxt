<template>
  <client-only>
    <section class="cart custom-container py-10">
      <div class="progress">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="cart"
              color="#AAE73E"
              size="1.7rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">سبد خرید</h2>
        </div>
        <hr>
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="money"
              color="#AAE73E"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">پرداخت</h2>
        </div>
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
          <h2 class="text">خرید موفق</h2>
        </div>
      </div>

      <div class="cart-block">
        <div class="cart-block-list">
          <div class="pro">
            <div class="box">
              <Product :typeProduct="'profile'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'profile'"/>
            </div>
          </div>
        </div>
        <div class="cart-block-forms">
          <div class="payment-message" >
            <v-icon>mdi mdi-check</v-icon>
            <h2>ممنون از خرید شما!</h2>
          </div>
          <div class="block-info">
            <div class="totalPrice">
              <label>شماره لایسنس : </label>
              <span>45489545</span>
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
              <span> بازگشت به پنل کاربری</span>
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
    title: "خرید موفق - لاینو تایپ",
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
    flex-direction: column;
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
          background: #fff;
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

          &:hover{
            background: #AAE73E;
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
.payment-message{
  width: 510px;
  margin: 0 auto 20px;
  padding: 15px;
  display: flex;
  gap: 11px;
  h2{
    font-size: 20px;
  }
  i{
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background: #aae73e;
    color: #fff;
    margin-left: 15px;
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
