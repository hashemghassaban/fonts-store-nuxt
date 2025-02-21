<template>
  <client-only>
    <div class="faq custom-container py-10 ">
      <section class="faq-title">
        <SvgIcon
          name="faq"
          color=#FF7A00
          size="38px"
          className="rounded-full"
        />
        <h2>سؤالات متداول</h2>
      </section>
      <section class="faq-content">
        <div class="faq-list">
          <h2>امور مشتریان</h2>
          <v-expansion-panels v-model="activePanel">
            <v-expansion-panel v-for="(item, index) in items" :key="index">
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
              <v-expansion-panel-content>{{ item.content }}</v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div class="faq-list">
          <h2> حساب کاربری</h2>
          <v-expansion-panels v-model="activePanel2">
            <v-expansion-panel v-for="(item, index) in items2" :key="index">
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
              <v-expansion-panel-content>{{ item.content }}</v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div class="faq-list">
          <h2>امور مشتریان</h2>
          <v-expansion-panels v-model="activePanel3">
            <v-expansion-panel v-for="(item, index) in items" :key="index">
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
              <v-expansion-panel-content>{{ item.content }}</v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div class="faq-list">
          <h2> حساب کاربری</h2>
          <v-expansion-panels v-model="activePanel4">
            <v-expansion-panel v-for="(item, index) in items2" :key="index">
              <SvgIcon name="arrow" size="12px" color="#fff" class="icons"></SvgIcon>
              <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
              <v-expansion-panel-content>{{ item.content }}</v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </section>





    </div>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  head: {
    titleTemplate: "",
    title: "پرسش و پاسخ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "  پرسش و پاسخ - ",
    },
  ],
  components: {
    SvgIcon,
  },
  data() {
    return {
      items: [
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
      ],
      activePanel2: [0],
      items2: [
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
      ],
      activePanel: [0],
      activePanel3: [0],
      activePanel4: [0],


    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.faq{
  &-title{
    display: flex;
    justify-content: center;
    margin: 0 auto 10px;
    gap: 15px;
  }
  &-content {
    display: flex;
    justify-content: center;
    margin: 50px 0;
    gap: 0;
    padding: 0 5%;
    flex-direction: column;
    flex-wrap: wrap;
    @include breakpoint(medium) {
      flex-direction: row;
      padding: 0 10%;
      gap: 40px;
    }
    .faq-list{
      text-align: justify;
      line-height: 35px;
      color: #7D7D7D !important;
      flex: 100%;
      max-width: 100%;
      margin-bottom: 30px;
      @include breakpoint(medium) {
        flex: 48%;
        max-width: 48%;
        margin-bottom: 0;
      }
      &:last-child{
        margin-bottom: 0;
      }
      h2{
        font-size: 18px;
        color: #ff7a00;
        display: inline-block;
        padding: 5px 10px;
        border-radius: 9px;
        margin-bottom: 15px;
      }
    }
  }
  ::v-deep {
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


  }
}
</style>
