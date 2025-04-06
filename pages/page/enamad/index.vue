<template>
  <client-only>

    <section class="support custom-container py-10" >

      <div class="support-title">
        <SvgIcon
          name="post"
          color=#FF7A00
          size="38px"
          className="rounded-full"
        />
        <h1>نماد اعتماد</h1>
      </div>
      <div class="type-font" >
        <div v-html="dataResult" class="namadContent"></div>


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
  computed: {
    namad() {
      return this.$store.state.namad
    },
  },
  mounted() {
  setTimeout(()=>{
    const parsedData = JSON.parse(JSON.stringify(this.namad))
    this.dataResult = parsedData
  },1000)
  },
  head() {
    return {
      title: " نماد اعتماد - لاینو تایپ",

      meta: [

        {
          hid: 'description',
          name: 'description',
          content: "نماد اعتماد لاینو تایپ",
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: " نماد اعتماد - لاینو تایپ" ,
        },

        {
          hid: 'og:description',
          name: 'og:description',
          content: "نماد اعتماد لاینو تایپ",
        },
      ],
    }
  },


};
</script>

<style lang="scss" scoped>
.namadContent{
  display: flex;
  justify-content: center;
  align-items: center;
}
.support{
  &-title{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 10px;
    gap: 15px;
  }
  .type-font{
    margin-top: 50px;
    margin-bottom: 0;
    padding: 0;
    @include breakpoint(medium) {
      padding: 0 ;
      margin-bottom: 100px;
      margin-top: 40px;
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
      text-align: center;
      @include breakpoint(medium) {
        text-align: center;
      }
    }

  }
}
ul{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
  gap: 20px;
  flex-direction: column;
  @include breakpoint(small) {
    flex-direction: row;
    gap: 40px;
  }
  li{
    border: 1px solid #ccc;
    overflow: hidden;
    border-radius: 10px;

    a{
      width: 100%;
      height: 100%;
      display: block;
      padding: 15px;
      @include breakpoint(small) {
        padding: 31px;
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
