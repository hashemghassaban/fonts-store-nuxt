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
      dataProduct:[]


    }
  },
  async asyncData({ params }) {
    const dataProduct = await fetch(
      `https://linotyper.com/api/v1/pages/${params.slug}`
    ).then((res) => res.json());
    return { dataProduct };
  },
  computed: {

    currentPath() {
      return this.$router?.history?.current?.params?.slug
    },
  },
  methods: {

    async getData(name) {
      this.loading=true
      await fetch(
        `https://linotyper.com/api/v1/pages/${name}`,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then((res) => {
          this.dataResult = res?.entity?.page
          this.loading=false
        })
    },

  },
  mounted() {
    setTimeout(()=>{
      this.getData(this.currentPath);
    },500)
  },
  head() {
    return {
      title:  `${this.dataProduct?.entity?.page?.seo?.title} - لاینو تایپ`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.dataProduct?.entity?.page?.seo?.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.dataProduct?.entity?.page?.seo?.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:  `${this.dataProduct?.entity?.page?.seo?.title} - لاینو تایپ`,
        },

        {
          hid: 'og:description',
          name: 'og:description',
          content: this.dataProduct?.entity?.page?.seo?.description,
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
