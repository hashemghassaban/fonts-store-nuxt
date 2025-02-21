<template>
  <client-only>
    <div class="productMain  py-10">
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
          <div class="col-3">
            <div class="box">
              <div class="count">+65</div>
              <div class="icon">
                <img src="~/assets/img/element/box01.png" alt="">
              </div>
              <div class="text">
                <span>کالیگرافی</span>
                <button> <SvgIcon
                  name="arrow"
                  color="#AAE73E"
                  size="1.3rem"
                  className="rounded-full"
                /></button>

              </div>
            </div>

          </div>
          <div class="col-3">
            <div class="box">
              <div class="count">+65</div>
              <div class="icon">
                <img src="~/assets/img/element/box02.png" alt="">
              </div>
              <div class="text">
                <span>هندسی</span>
                <button>            <SvgIcon  icon="Arrow" size="md" color="#c8c8c8"  />              </button>

              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="box">
              <div class="count">+65</div>
              <div class="icon">
                <img src="~/assets/img/element/box03.png" alt="">
              </div>
              <div class="text">
                <span>دست نویس</span>
                <button>
                  <SvgIcon
                    name="arrow"
                    color="#AAE73E"
                    size="1.3rem"
                    className="rounded-full"
                  />
                </button>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="box">
              <div class="count">+65</div>
              <div class="icon">
                <img src="~/assets/img/element/box04.png" alt="">
              </div>
              <div class="text">
                <span>نمایشی</span>
                <button>
                  <SvgIcon
                    name="arrow"
                    color="#AAE73E"
                    size="1.3rem"
                    className="rounded-full"
                  />
                </button>
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
            <div class="box">
              <Product :typeProduct="'product'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'product'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'product'"/>
            </div>
            <div class="box">
              <Product :typeProduct="'product'"/>
            </div>
          </div>
          <v-pagination
            v-model="page"
            :length="5"
            class="my-4"
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


export default {
  head: {
    titleTemplate: "%s -فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی",
    title: "لیست محصول ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "  درباره ما - فروشگاه اینترنتی شیرالات و تجهیزات ساختمانی",
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

    }
  },
  methods: {



  }
};
</script>

<style lang="scss" scoped>
.category{
  padding: 50px 5% 100px;
  &-block{
    display: flex;
    margin-top: 50px;
    padding: 0;
    .col-3{
      width: 25%;
      flex: 25%;
    }
    .box{

      height: 300px;
      background: #000;
      border-radius: 15px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      &:hover{
        background: #FF7A00;
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

      }
      .count{
        text-align: left;
        color: #fff;
        font-size: 44px;
        direction: ltr;
        margin: 10px 20px;
        font-family: sans-serif;
        font-weight: 700;
      }
      .text{
        display: flex;
        span{
          color: #fff;
          position: absolute;
          bottom: 20px;
          right: 15px;
          font-size: 25px;
          font-weight: 800;
        }
        button{
          position: absolute;
          left: 25px;
          bottom: 28px;
        }

      }

    }
  }
}
.productMain{
  padding: 0 10%;
  &-lists{
    padding: 0 5%;
    &-filter{
      display: flex;
      justify-content: space-between;
      .filter{
        width: 150px;
        .v-input{
          border-radius: 12px;
          width: 248px;
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
      width: 650px;
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
        border-radius: 12px;

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
    height: 500px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    margin: 100px 0 0;
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
      max-width: 50%;
      flex: 49%;
    }
  }
}
.type-font{
  padding: 0 5%;
  margin-top: 100px;
  margin-bottom: 100px;
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
  }

}

</style>
