<template>
  <client-only>
    <section class="about  py-10">
<!--      <div class="about-banner custom-container">-->
<!--        <img src="~/assets/img/banner/about.jpg" alt="">-->
<!--      </div>-->

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
                <div class="value">+98-9120001122</div>
              </div>
            </li>
            <li>
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <div class="field">
                <div class="name">پشتیبلنی ایمیل</div>
                <div class="value">Linotype@gmail.com</div>
              </div>
            </li>
            <li>
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <div class="field">
                <div class="name">پشتیبانی تلفنی</div>
                <div class="value">+98-21 88 66 55</div>
              </div>
            </li>
          </ul>
        </div>

      </section>
      <section class="contact-form">
        <div class="contact-form-block">
          <div class="block">
            <TextInput
              validators="subject"
              class="my-2"
              :isValid.sync="isValid"
              v-model="fullName"
              label="نام"
            />
            <TextInput
              validators="email"
              class="my-2"
              :isValid.sync="isValid"
              v-model="email"
              label=" ایمیل"
            />
          </div>

          <div class="block pb-5 pt-5">
            <TextInput
              class="my-2"
              :isValid.sync="isValid"
              v-model="description"
              height="100px"
              width="100%"
              label="متن پیام"
            />
          </div>
          <div class="block">
          <div class="d-flex justify-center align-center">
            <v-img
              style="cursor: pointer"
              class="rounded"
              max-width="200"
              max-height="56"
              :src="captcha"
            />
            <v-btn
              class="mr-2 refresh"
              icon
              color="white"
              :loading="captchaLoading"
              @click="getCaptcha"

            >
              <v-icon size="30" color="white"> mdi-refresh </v-icon>
            </v-btn>
          </div>
            <TextInput
              class="my-2 code"
              :isValid.sync="isValid"
              v-model="captchaCode"
              label="کد امنیتی "
            />
          </div>
          <div class="block">
            <v-btn
              elevation="0"
              class="secondary btn"
              @click="SubmitContact"
            >  <SvgIcon
              name="arrow"
              color="#fff"
              size="15px"
              className="rounded-full"
              style="margin-left: 15px"
            />   ارسال  </v-btn
            >
          </div>
        </div>
      </section>
    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import VueSlickCarousel from "vue-slick-carousel";
import TextInput from "@/components/TextInput/TextInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import { pagesService  } from '~/services'


export default {
  head: {
    titleTemplate: "",
    title: " ارتباط با ما - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: " ارتباط با ما - ",
    },
  ],
  components: {
    SvgIcon,
    VueSlickCarousel,
    TextInput,
    SelectInput
  },
  data () {
    return {
      captcha:'',
      dialogVideo:false,
      captchaLoading:false,
      videoSource: 'https://www.w3schools.com/html/mov_bbb.mp4',
      BrandData: [
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },

        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },

        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },

        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },

        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },

        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
        {url:'/',imagePath:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYjjplEXRIYUP9MtxgXigsOGpVGfYJrUdTHzawNtAWTpqAjWkn&s' , name:'مسعود سپهری' },
      ],
      settingsBrand: {
        slidesToShow: 5,
        "arrows": false,
        "dots": false,
        "infinite": true,
        "slidesToScroll": 1,
        "autoplay": true,
        "speed": 2000,
        "autoplaySpeed": 2000,
        "cssEase": "linear",

        responsive: [
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      },
      isValid: false,
      fullName:'',
      tell:'',
      description:'',
      email:'',
      captchaCode:'',
      key:''

    }
  },
  methods: {
    async getCaptcha(){
      this.captchaLoading = true

      try {
        const res = await pagesService.getCaptcha()
        this.captcha = res?.img
        this.key = res?.key
        this.captchaLoading = false

      } catch (error) {
        this.captchaLoading = false
        this.$toast.error(error, {
          timeout: 4000,
        })
      }
    },
    async SubmitContact() {
      let body = {
        name:this.fullName,
        email:this.email,
       captcha:this.captchaCode,
        description:this.description,
        key: this.key
      }
      if(this.isValid){
      try {
        await pagesService.postContactUs(body)
        this.$toast.success('متن پیام با موفقیت ارسال شد', {
          timeout: 4000,
        })
      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
      }
      }
    },
    showVideo(){
      this.dialogVideo = true
      this.$nextTick(() => {
        this.$refs.videoPlayer.play();
      });
    },
    hideVideo(){
      this.dialogVideo = false
      this.$nextTick(() => {
        this.$refs.videoPlayer.pause();
      });
    }

  },
  mounted() {
    this.getCaptcha();
  }
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
      font-size: 25px;
      color: #646464;
      margin-bottom: 18px;
      margin-top: 30px;
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
            @include breakpoint(medium) {
              font-size: 20px;
            }
          }
        }
      }
    }

  }
}

.refresh{
  i{
    color: #ff7a00 !important;
    margin-right: 20px;
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
