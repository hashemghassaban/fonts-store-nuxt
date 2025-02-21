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
      <div class="type-font">
        <h3>فونت فارسی</h3>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
        <h3>انواع فونت فارسی</h3>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
      </div>
    </section>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  head: {
    titleTemplate: "",
    title: "همکاری با ما",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "  همکاری با ما - ",
    },
  ],
  components: {
    SvgIcon,
  },
  data () {
    return {

    }
  },
  methods: {}
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
