<template>
  <client-only>
    <section class="workUs custom-container py-10">
      <div class="workUs-title">
        <SvgIcon
          name="users"
          color=#FF7A00
          size="38px"
          className="rounded-full"
        />
        <h2>همکاری با ما</h2>
      </div>
      <Loading v-if="loading" />
      <div class="type-font"  v-else>
        <h3>{{dataResult?.title}}</h3>
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
  head: {
    titleTemplate: "",
    title: "همکاری با ما - لاینو تایپ ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content:"همکاری با ما - لاینو تایپ ",
    },
  ],
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
        const res = await pagesService.getWorkPage()
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
  }

};
</script>

<style lang="scss" scoped>
.workUs{
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
      margin-top: 100px;
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
</style>
