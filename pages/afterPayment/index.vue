<template>
  <client-only>
    <section class="payment">
      <div class="payment-message" :class="isSuccess ? 'success' :''">
        <v-icon>mdi mdi-check</v-icon>
          <span>پرداخت شما موفق بود!</span>
      </div>
      <div class="payment-content">
        <h2 v-if="isSuccess"><Timer
          target-minutes="3"
          :show-controls="false"
          @complete="handleComplete"
        /> تا ورود به پروفایل</h2>
        <h2 v-else> لطفاً دقایقی دیگر تلاش کنید</h2>

        <SvgIcon
          name="clock"
          color="#ff5722"
          size="100px"
          className="rounded-full"
        />
        <div class="payment-content-text">
          <h3  v-if="isSuccess">ممنون از خرید شما!</h3>
          <h3 v-else>متأسفیم!</h3>
          <p  v-if="isSuccess">برای دانلود فایل فونت(های) خرید شده به پروفایل مراجعه کنید:</p>
          <p v-else>درصورت کسر از حساب، به مدت ۴۸ ساعت بازگشت مبلغ انجام خواهد شد.</p>
          <nuxt-link to="/page/order" class="go-to-profile" >
            <SvgIcon
              name="arrow"
              color="#000"
              size="16px"
              className="rounded-full"
            />
            برو به پروفایل
          </nuxt-link>
        </div>
      </div>

    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import Timer from "@/components/counter/counter";

export default {
  head: {
    titleTemplate: "",
    title: "وضعیت پرداخت",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: " وضعیت پرداخت -",
    },
  ],
  components: {
    SvgIcon,
    Timer
  },
  data () {
    return {
      isSuccess : true,
    }
  },
  methods: {

    handleComplete() {
      console.log('زمان به پایان رسید!')
    },


  }
};
</script>

<style lang="scss" scoped>

.payment{
  padding: 0 0;
  margin-top: 165px;
  &-message{
    height: 50px;
    background: #F15A24!important;
    border-color: #F15A24!important;
    line-height: 50px;
    text-align: center;
    margin: 40px 0;
    display: block;
   span{
     color: #fff;
   }
    i{
      width: 30px;
      height: 30px;
      border-radius: 100px;
      background: #000;
      color: #fff;
      margin-left: 15px;
    }
   &.success{
     background: #AAE73E!important;
     border-color: #AAE73E!important;
     span{
       color: #000;
     }
   }
  }
  &-content{
    text-align: center;
    h2{
      color: #ff5722;
      font-size: 22px;
      font-weight: 100;
      i{
        margin: 20px 0 40px;
        display: block;
      }
    }
    &-text{
      text-align: center;
      margin:35px 5%;

      @include breakpoint(medium) {
        margin: 80px 0;

      }

      h3{
color: #454545;
      }
      p{
        color: #454545;
      }
      .go-to-profile{
        width: 300px;
        background: #F15A24;
        height: 54px;
        border-radius: 15px;
        border: 3px solid #F15A24;
        display: flex;
        padding: 0 7px;
        font-size: 18px;
        font-weight: 900;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 50px auto;
        gap: 15px;
        color: #fff;
        transition: all 0.3s ease;

        &:hover{
          background: #fff;
          border: 3px solid #F15A24;
          color: #000;
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

      }
    }
  }
}
</style>
