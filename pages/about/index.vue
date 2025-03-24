<template>
  <client-only>
    <section class="about custom-container py-10">
      <Loading v-if="loading" />
      <div class="about-content" v-else>
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
          <p >{{dataResult?.description}}</p>
          <div  class="content" v-html="dataResult?.content"></div>
        </section>
      </div>
    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { pagesService  } from '~/services'

export default {
  components: {
    SvgIcon,
  },
  data () {
    return {
      dataResult:[],
      loading:false,
    }
  },
  methods: {
    async getData() {
      this.loading = true
      try {
        const res = await pagesService.getAboutPage()
        setTimeout(() => {
          this.dataResult = res?.entity?.page
          this.loading = false

        }, 1000);

      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
      }
    },
  },
    mounted() {
      this.getData();
    },
  head() {
    return {
      title:  " درباره ما - لاینو تایپ",
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.dataResult?.description,
        },
        {
          hid: 'description',
          name: 'description',
          content:this.dataResult?.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:  " درباره ما - لاینو تایپ",
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.dataResult?.description,
        },
      ],
    }
  },

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
      margin-bottom: 20px;
    }
    p{
      text-align: justify;
      line-height: 35px;
      color: #7D7D7D !important;

    }
   ::v-deep{
     .content{

       p{
         text-align: justify;
         line-height: 35px;
         color: #7D7D7D !important;
       }
     }
  }
  }

  .feature{
    padding: 10px 5%;
    position: relative;
    top: 0;



    &-block{
      height: 180px;
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
        transform:translate(50%, 0);
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
  margin: 0 auto 10px;
  gap: 15px;
  @include breakpoint(small) {
    //margin: 100px auto 10px;
    margin: 30px auto 10px;

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
