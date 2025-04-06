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
        <Loading v-if="loading" />

        <div class="faq-list" v-if="item?.faqs?.length > 0"  v-for="(item, index) in category" :key="index">
            <h2> {{item?.name}}</h2>
          <v-expansion-panels
            :value="[activePanel[index]]"
            @change="(val) => handlePanelChange(val, index)"
          >
            <v-expansion-panel
              v-for="(data, i) in item.faqs"
              :key="`${index}-${i}`"
            >
              <SvgIcon
                name="arrow"
                size="12px"
                color="#fff"
                class="icons"
              />
              <v-expansion-panel-header @click.stop="togglePanel(index, i)">
                {{ data.question }}
              </v-expansion-panel-header>
              <v-expansion-panel-content v-html="data.answer"></v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </section>
    </div>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { pagesService  } from '~/services'

export default {
  head: {
    titleTemplate: "",
    title: "پرسش های متداول - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "پرسش های متداول - لاینو تایپ",
    },
  ],
  components: {
    SvgIcon,
  },
  data() {
    return {
      category: [
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
        { title: 'اختلال اضطراب فراگیر ، پرخوری عصبی و سایر اختلالات خوردن', content: 'اختلال اضطراب فراگیر ، پرخوری عصبی' },
      ],
      activePanel: [],
      loading:false

    }
  },
  methods: {
    togglePanel(categoryIndex, panelIndex) {
      // اگر پنل قبلاً باز بود، آن را می‌بندیم
      if (this.activePanel[categoryIndex] === panelIndex) {
        this.$delete(this.activePanel, categoryIndex)
      }
      // اگر پنل بسته بود یا پنلی در این دسته باز نبود، آن را باز می‌کنیم
      else {
        this.$set(this.activePanel, categoryIndex, panelIndex)
      }

      // بستن همه پنل‌های باز در سایر دسته‌ها
      Object.keys(this.activePanel).forEach(index => {
        if (Number(index) !== categoryIndex) {
          delete this.activePanel[index]
        }
      })
    },
    handlePanelChange(value, categoryIndex) {
      // اگر پنل بسته شد، مقدار آن را حذف می‌کنیم
      if (!value.length) {
        delete this.activePanel[categoryIndex]
        return
      }

      // تنظیم مقدار جدید برای این دسته
      this.$set(this.activePanel, categoryIndex, value[0])

      // بستن همه پنل‌های دیگر در دسته‌های دیگر
      Object.keys(this.activePanel).forEach(index => {
        if (Number(index) !== categoryIndex) {
          delete this.activePanel[index]
        }
      })
    },
    async getFaq() {
      this.loading = true
      try {
        const res = await pagesService.getFaq()
        setTimeout(() => {
          this.category = res?.entity?.categories
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
    this.getFaq();
  }


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
      padding: 0 22px;
      p{
        color: #ff5722!important;
        font-size: 13px;
        line-height: 23px;
        @include breakpoint(medium) {
          font-size: 15px;
          line-height: 25px;
        }
      }
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
