<template>
  <client-only>
    <div class="productMain ">
      <section class="category">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="category"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">دسته بندی فونت</h2>
        </div>
        <div class="category-block">
          <div class="col-3" v-for="(item, i) in (category)?.slice(0, 4)" :key="i">
            <div class="box">
              <div class="count">+{{item.products_count}}</div>
              <div class="icon">
                <img
                  :src="require(`~/assets/img/element/box0${i+1}.png`)"
                  alt=""
                />

              </div>
              <div class="text">
                <span>{{item.name}}</span>
                <button> <SvgIcon
                  name="arrow"
                  color="#AAE73E"
                  size="1.3rem"
                  className="rounded-full"
                /></button>

              </div>
            </div>

          </div>


        </div>

      </section>
      <section class="productMain-lists">
        <div class="productMain-lists-filter">
          <div class="searchBlock">
            <v-text-field
              v-model.trim="searchText"
              dense
              filled
              rounded
              clearable
              placeholder="جستجو اسم فونت"
              prepend-inner-icon="mdi-magnify"
              class="pt-6 shrink expanding-search"
            ></v-text-field>
          </div>
          <div class="filter">
            <v-select
              :items="itemsFilter"
              v-model="filter"
              label="به ترتیب"
              outlined
            >
              <template #prepend-inner>
                <SvgIcon
                  name="filter"
                  color="#969696"
                  size="1.3rem"
                  className="rounded-full"
                />
              </template>
            </v-select>
          </div>
        </div>
        <div class="productMain-lists-block">
          <div class="latest-font-block">
            <div class="box" v-for="(item, i) in product" >
              <Product :typeProduct="'product'" :items="item" @refreshData="refreshData"/>
            </div>

          </div>
          <v-pagination
            v-model="page"
            :length="Math.ceil(totalItems / itemsPerPage)"
            :total-visible="7"
            class="my-4"
            @input="getProductAll"
          ></v-pagination>
        </div>
      </section>
      <section class="productMain-banner">
        <img src="~/assets/img/banner/about.jpg" alt="">
      </section>
      <section class="type-font">
        <h3>فونت فارسی</h3>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
        <h3>انواع فونت فارسی</h3>
        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد. بان فارسی ایجاد کرد. ساسا مورد استفاده قرار گیرد.</p>
      </section>
    </div>
  </client-only>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import VueSlickCarousel from "vue-slick-carousel";
import TextInput from "@/components/TextInput/TextInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import { productService } from '~/services'


export default {
  head: {
    titleTemplate: "",
    title: "لیست محصول - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "  لیست محصول - ",
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
      searchText: '',
      itemsFilter: ['پربازدید ترین', 'پرفروش ترین', 'محبوب ترین', 'جدیدترین','ارزانترین','گرانترین'],
      filter: 'جدیدترین',
      page: 1,
      itemsPerPage: 10,
      totalItems: 0,
      category:[],
      product:[]

    }
  },
  watch: {
    itemsPerPage(newVal) {
      this.page = 1 // Reset page when itemsPerPage changes
      this.getProductAll()
    }
  },
  methods: {
    refreshData(newValue) {
      if(newValue ){
        this.getProductAll()
      }

    },
    async getProductAll() {
      try {
        const product = await productService.getProductAll()
        this.product = product?.entity?.data
        this.totalItems = product?.entity?.total

      } catch (error) {
        console.error('خطا در دریافت محصول:', error)
      }
    },

  },
  mounted() {
    this.category = this.$store.state.categories
    this.getProductAll();

  }
};
</script>

<style lang="scss" scoped>
.category{
  padding: 50px 5%;
  &-block{
    display: flex;
    margin-top: 50px;
    padding: 0 ;
    flex-wrap: wrap;
    .col-3{
      width: 50%;
      flex: 50%;
      min-width: 50%;
      @include breakpoint(medium) {
        width: 25%;
        flex: 25%;
        min-width: 25%;
      }
    }
    .box{

      height: 150px;
      background: #000;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      @include breakpoint(medium) {
        height: 250px;
        width: 250px;
        margin: auto;
      }

      &:hover{
        background: #FF7A00;
        transition: all 0.3s ease;

        .count{color: #000}
        .text{
          span {
            color: #000
          }
        }
      }
      .icon{
        position: absolute;
        right: 50%;
        top: 50%;
        transform: translate(50%, -50%);
        img{
          width: 35px;
          @include breakpoint(medium) {
            width: 50px;
          }
        }


      }
      .count{
        text-align: left;
        color: #fff;
        font-size: 20px;
        direction: ltr;
        margin: 10px 20px;
        font-family: sans-serif;
        font-weight: 700;
        @include breakpoint(medium) {
          font-size: 44px;
        }
      }
      .text{
        display: flex;
        span{
          color: #fff;
          position: absolute;
          bottom: 20px;
          right: 15px;
          font-size: 15px;
          font-weight: 800;
          @include breakpoint(medium) {
            font-size: 25px;
          }
        }
        button{
          position: absolute;
          left: 20px;
          bottom: 20px;
          @include breakpoint(medium) {
            left: 25px;
            bottom: 28px;
          }
          i{
            font-size: 18px!important;
            @include breakpoint(medium) {
              font-size: 1.3rem!important;
            }
          }

        }

      }

    }
  }
}
.productMain{
  padding: 0 0;
  @include breakpoint(medium) {
    padding: 0 10%;
  }
  &-lists{
    padding: 0 5%;
    &-filter{
      display: flex;
      justify-content: space-between;
      .filter{
        width: 130px;
        @include breakpoint(medium) {
          width: 250px;
        }

        .v-input{
          border-radius: 10px;
          width: 150px;
          font-size: 15px;
          @include breakpoint(medium) {
            width: 248px;
            font-size: 12px;
          }
          ::v-deep{
            .v-icon{
              display: none;
            }
            .v-input__slot{
              min-height: 51px;
              height: 51px;
            }
          }


        }
      }
    }
    .searchBlock{
      position: relative;
      z-index: 1;
      width: 200px;
      @include breakpoint(medium) {
        width: 650px;
      }
    }
    .expanding-search {
      transition: max-width 0.3s ease-in-out;
      background: rgb(255 255 255)!important;
      padding: 0!important;

      .v-input__slot{
        background: rgb(255 255 255)!important;


      }


    }
    ::v-deep{
      .v-text-field--filled > .v-input__control > .v-input__slot {
        background:#fff!important;
        padding: 0 10px!important;
        border: 1px solid #646464;
        min-height: 50px!important;
        height: 50px!important;
        border-radius: 10px;

      }
      .v-icon{
        font-size: 27px;
        position: relative;
        top: 4px;
      }
      .v-text-field__slot{
        padding: 0 15px!important;
      }

    }
    &-block{

    }
  }
  &-banner{
    height: 250px;
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    padding: 0;
    margin: auto;
    @include breakpoint(medium) {
      height: 500px;
    }
    img{
      width:100%;
      height: 100%;
      object-fit: fill;
    }
  }
}
.latest-font{
  padding: 50px 5%;
  position: relative;


  &.last{
    background: #EEE;
    padding: 50px 5% 230px;
  }
  &-block{
    display: flex;
    margin-top: 50px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    .box{
      max-width: 100%;
      flex: 100%;
      @include breakpoint(medium) {
        max-width: 48%;
        flex: 48%;
      }
    }
  }
}
.type-font{
  margin-top: 50px;
  margin-bottom: 0;
  padding: 0 5%;
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
::v-deep {
  .v-pagination {
    margin: 0 0 100px;
  }
}

</style>
