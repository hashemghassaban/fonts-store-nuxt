<template>
  <client-only>
    <section class="about  py-10">
      <section class="contact-info">
        <div class="contact-info-block">
          <h4>جواب شما در سوالات متداول نبود؟</h4>
          <p>با ما در ارتباط باشید:</p>
          <SvgIcon
            name="support"
            color=#FF7A00
            size="90px"
            className="rounded-full"
          />
          <ul class="support">
            <li>
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <div class="field">
                <div class="name">پشتیبانی تلگرام</div>
                <a href="https://t.me/linotyper_sup" class="value">linotyper_sup</a>
              </div>
            </li>
            <li>
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <div class="field">
                <div class="name">ایمیل</div>
                <a href="mailto:linotyper.ir@gmail.com" class="value">linotyper.ir[at]gmail.com</a>
              </div>
            </li>
            <li>
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <div class="field">
                <div class="name">پشتیبانی تلفنی</div>
                <nuxt-link to="/page/telsup" class="value">اینجا کلیک کنید</nuxt-link>
              </div>
            </li>
          </ul>
        </div>

      </section>
    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";


export default {

  components: {
    SvgIcon,
  },


  head() {
    return {
      title: " ارتباط با ما - لاینو تایپ",

      meta: [

        {
          hid: 'description',
          name: 'description',
          content:"با ما در ارتباط باشید" ,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:   " ارتباط با ما - لاینو تایپ",
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:"با ما در ارتباط باشید" ,
        },
      ],
    }
  },
};
</script>

<style lang="scss" scoped>
.about{
  margin-top: 40px;
  &-banner{
    height: 250px;
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    margin-bottom: 100px;
    @include breakpoint(medium) {
      height: 500px;
    }
    img{
      width:100%;
      height: 100%;
      object-fit: fill;
    }
  }



  .type-font{
    margin-top: 100px;
    margin-bottom: 0;
    padding: 0 5%;
    @include breakpoint(medium) {
     padding: 0 ;
      margin-bottom: 100px;
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
}
.about-title{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 10px;
  gap: 15px;
  @include breakpoint(medium) {
    margin: 100px auto 10px;

  }


}
.contact-info{
  background: #eee;
  padding: 5%;
  &-block{
    text-align: center;
    h4{
      font-size: 20px;
      color: #646464;
      margin-bottom: 18px;
      margin-top: 50px;
      @include breakpoint(medium) {
        font-size: 30px;
        margin-bottom: 80px;
        margin-top: 0;
      }
    }
    p{
      font-size: 22px;
      margin-bottom: 26px;
      color: #646464;
    }
    .support{
      width: 100%;
      margin: 30px auto;
      @include breakpoint(medium) {
        width: 600px;
      }
      li{
        display: flex;
        margin: 0 0 20px;
        justify-content: center;
        align-items: center;
        gap: 20px;
        &:nth-child(1){
          i{
            background: #AAE73E;
          }
        }

        &:nth-child(3){
          i{
            background: #F15A24;
          }
        }
        i{
          font-size: 12px;
          min-width: 40px;
          height: 40px;
          background: #000;
          line-height: 40px;
          border-radius: 65px;
        }

        .field{
          display: flex;
          background: #fff;
          height: 63px;
          border-radius: 10px;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          padding: 0 23px;
          .name{
            font-size: 15px;
            color: #878787;
            @include breakpoint(medium) {
              font-size: 20px;
            }

          }
          .value{
            font-size: 15px;
            color: #ccc;
            direction: ltr;
            -webkit-transition: 0.5s ease;
            transition: 0.5s ease;
            @include breakpoint(medium) {
              font-size: 20px;
            }
            &:hover{
              color: #ff5722;
              -webkit-transition: 0.5s ease;
              transition: 0.5s ease;
            }
          }
        }
      }
    }

  }
}


.contact-form {
  background: #eee;
  padding: 50px 0 65px;
  @include breakpoint(medium) {
    padding: 0 0 5%;

  }

  &-block{
    width: 100%;
    margin: auto;
    padding: 0 5%;
    @include breakpoint(medium) {
      width: 600px;
      padding: 0;
    }
    .block{
      text-align: center;
      display: flex;
      gap: 15px;
      flex-direction: column;
      @include breakpoint(medium) {
        flex-direction: row;
      }
      .d-flex{
        width: 100%;
        @include breakpoint(medium) {
          width: 50%;
        }
      }
      .code{
        width: 100%;
        margin: 0 0 40px !important;
        @include breakpoint(medium) {
          width: 50%;
          margin:10px 0 17px !important;
        }
      }
    }
  }
}
::v-deep {
  .form-text-input-container{
    margin: 0px !important;
    padding: 0;
    @include breakpoint(medium) {
      margin: 8px 0 !important;
    }
  }
  .v-expansion-panel-header{
    font-size: 13px;
    line-height: 23px;
    @include breakpoint(medium) {
      font-size: 15px;
      line-height: 25px;
    }
  }

  .v-expansion-panel{
    background: #F4F4F4 !important;
    margin-bottom: 15px!important;
    border-radius: 10px!important;;
    &::before{
      box-shadow: none!important;
    }
    &-header {
      height: 57px!important;
    }
    &:not(:first-child)::after{
      border:0!important;
    }
    &--active{
      .font-arrow {
        transform: rotate(-136deg);
        transition-duration: 0.5s;
      }
    }
    .v-expansion-panel-header__icon{
      display: none;
    }

    .font-arrow{
      width: 30px;
      height: 30px;
      display: inline-block;
      background: #000;
      transition-duration: 0.5s;
      border-radius: 50px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      right: -16px;
      top: 13px;
    }
  }
  .v-expansion-panel-content{
    .v-expansion-panel-content__wrap{
      color: #ff5722!important;
      font-size: 13px;
      line-height: 23px;
      @include breakpoint(medium) {
        font-size: 15px;
        line-height: 25px;
      }

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

}
</style>
