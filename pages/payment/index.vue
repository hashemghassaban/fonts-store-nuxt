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
          <h2 class="text">سبد خرید</h2>
        </div>
        <hr>
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="money"
              color="#F15A24"
              size="1.7rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">پرداخت</h2>
        </div>
      </div>

      <div class="cart-block">
        <div class="cart-block-list">
          <div class="pro">
            <div class="box">
              <Product typeProduct="'cart'"/>
            </div>
            <div class="box">
              <Product typeProduct="'cart'"/>
            </div>
          </div>
        </div>
        <div class="cart-block-forms">
          <div class="block-info">
            <div class="discount">
              <label for="code">کد تخفیف : </label>
              <div class="discount-field">
                <input type="text" placeholder="کد" id="code">
                <button>

                  <img src="~/assets/img/icon/starBuy.png" alt="">
                  <span>اعمال</span>
                </button>
              </div>
            </div>
            <div class="totalPrice">
              <label for="code">جمع خرید : </label>
              <span>130.000 ت</span>
            </div>
            <div class="benefit-buy">
              <label for="code"> سود شما از خرید : </label>
              <span>130.000 ت</span>
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
           <button >
             <div class="icon">
               <SvgIcon
                 name="arrow"
                 color="#fff"
                 size="12px"
                 className="rounded-full"
               />
             </div>
             <span>تکمیل خرید و پرداخت</span>
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
    title: " سبد خرید",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "   سبد خرید - ",
    },
  ],
  components: {
    SvgIcon,
  },
  data () {
    return {

    }
  },
  methods: {


  }
};
</script>

<style lang="scss" scoped>
.progress{
  display: flex;
  width: 500px;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  hr{
    border: 1px dashed #d8d8d8;
    flex-grow: 1;
    margin-right: 8px;
    margin-left: 8px;
  }
  .title{
    &:last-child{
      opacity: 0.3;
      filter: grayscale(100);
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
  }
  &-forms{
    flex: 100%;
    max-width: 100%;
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
            width: 180px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            gap: 10px;
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
</style>
