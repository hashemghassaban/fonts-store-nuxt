<template>
  <client-only>

    <section class="support custom-container py-10" >
      <Loading v-if="loading" />

      <div class="support-title" v-if="!loading">
        <SvgIcon
          name="post"
          color=#FF7A00
          size="38px"
          className="rounded-full"
        />
        <h1>{{dataResult?.title}}</h1>
      </div>
      <div class="type-font" v-if="!loading"  >
        <p>{{dataResult?.description}}</p>
        <div v-html="dataResult?.content"></div>

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

    currentPath() {
      return this.$router?.history?.current?.params?.slug
    },
  },
  methods: {
    async getData(name) {
      this.loading = true
      try {
        const res = await pagesService.getPage(name)
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
    setTimeout(()=>{
      this.getData(this.currentPath);
    },500)
  },
  head() {
    return {
      title: `${this.dataResult?.title} - لاینو تایپ`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.dataResult?.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.dataResult?.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: " پشتیبانی - لاینو تایپ" ,
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
</style>
