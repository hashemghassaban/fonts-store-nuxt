<template>
  <client-only>
    <section class="about custom-container py-10">
      <div class="about-banner">
        <img src="~/assets/img/banner/about.jpg" alt="">
      </div>
      <div class="about-content">
        <section class="about-title">
          <SvgIcon
            name="users"
            color=#FF7A00
            size="38px"
            className="rounded-full"
          />
          <h2>درباره ما</h2>
        </section>
        <section class="about-content-description">
          <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
        </section>
        <section class="brands">
          <div class="about-title">
            <SvgIcon
              name="brands"
              color=#FF7A00
              size="38px"
              className="rounded-full"
            />
            <h2>برند های خریدار</h2>
          </div>


          <div class="c-wrapper ">
            <VueSlickCarousel v-bind="settingsBrand" v-if="BrandData?.length > 0">
              <div v-for="(item, i) in BrandData" :key="i" class="product">
                <div class="product-data">
                  <div
                    class="pro-pic brand-logo"
                  >
                    <img
                      draggable="false"
                      loading="lazy"
                      onmousedown="return false"
                      style="user-drag: none"
                      :src="
                      item.imagePath +
                      '?width=177&height=177'
                    "
                      :alt="item.name"
                      v-if="item.imagePath"
                    />
                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </section>
        <section class="feature">
          <div class="feature-block">
            <div class="feature-block-play" @click="showVideo">
              <img src="~/assets/img/icon/play.svg" alt="">
            </div>
          </div>

          <v-dialog width="800" v-model="dialogVideo" persistent  >


            <v-card

              prepend-icon="mdi-update"
              text="Your application will relaunch automatically after the update is complete."
              title="Update in progress"
              class="block-video"
            >
              <v-icon  @click="hideVideo" class="close" color="#fff">mdi-close</v-icon>

              <video
                controls
                width="640"

                ref="videoPlayer"
                height="360"
                :src="videoSource"

              >
                Your browser does not support the video tag.
              </video></v-card
            >


          </v-dialog>
        </section>
        <section class="about-title">
          <SvgIcon
            name="awards"
            color=#FF7A00
            size="38px"
            className="rounded-full"
          />
          <h2>جوایز</h2>
        </section>
        <section class="about-content-description">
          <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
        </section>
        <section class="type-font">
          <h3>فونت فارسی</h3>
          <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
          <h3>انواع فونت فارسی</h3>
          <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
        </section>
      </div>
    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import VueSlickCarousel from "vue-slick-carousel";

export default {
  head: {
    titleTemplate: "",
    title: " درباره ما - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "  درباره ما -",
    },
  ],
  components: {
    SvgIcon,
    VueSlickCarousel
  },
  data () {
    return {
      dialogVideo:false,
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
    }
  },
  methods: {

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

  }
};
</script>

<style lang="scss" scoped>
.about{
  padding: 0 5%;
  &-banner{
    height: 250px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    @include breakpoint(medium) {
      height: 500px;
    }
    img{
      width:100%;
      height: 100%;
      object-fit: fill;
    }
  }

  &-content-description {
    margin-bottom: 50px;
    @include breakpoint(medium) {
      margin-bottom: 150px;
    }
    p{
      text-align: justify;
      line-height: 35px;
      color: #7D7D7D !important;

    }
  }

  .feature{
    padding: 10px 5%;
    position: relative;
    top: 0;



    &-block{
      height: 250px;
      background: #fff;
      border-radius: 30px;
      overflow: hidden;
      position: relative;
      background: url('./assets/img/banner/about-video.jpg');
      background-size: 100% 100%;
      @include breakpoint(medium) {
        height: 585px;
      }
      &-play{
        width: 90px;
        height: 90px;
        border-radius: 100px;
        background: #000;
        position: absolute;
        right: 50%;
        top: 50px;
        transform:translate(50%, 30%);
        border: 8px solid #fff;
        cursor: pointer;
        text-align: center;
        line-height: 70px;
        transition: all 0.3s ease;
        @include breakpoint(medium) {
          width: 150px;
          height: 150px;
          transform:translate(50%, 100%);
          line-height: 125px;
          border: 11px solid #fff;

        }

        &:hover{
          border: 11px solid #FF7A00;
          transition: all 0.3s ease;

          img{
            filter: contrast(0.5);
            transition: all 0.3s ease;

          }

        }
        img{
          width: 25px;
          height: 25px;
          transition: all 0.3s ease;
          @include breakpoint(medium) {
            width: 35px;
            height: 35px;
          }

        }
      }


    }
    &-title{
      padding: 22px;
      font-size: 25px;
      color: #3A3A3A;
    }
  }
  .type-font{
    margin-top: 100px;
    margin-bottom: 0;
    padding: 0;
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
  @include breakpoint(small) {
    margin: 100px auto 10px;

  }


}
.product {
  &-data {
    margin: 0 0 50px;
    position: relative;
    background: #fff;
    @include breakpoint(small) {
      margin: 0 0 100px;

    }
    .pro-pic {
      height: 150px;
      padding: 20px;
      @include breakpoint(small) {
        height: 177px;
        padding: 0;
      }
      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
  }
}
::v-deep {
  .block-video {
    border: 0;
    height: auto;
    padding: 29px;
    background-color: #0000008f !important;
    border-radius: 10px !important;
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
