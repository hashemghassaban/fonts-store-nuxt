<template>
  <client-only>
    <div class="productMain ">
      <section class="category">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="post"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">لاینومگ</h2>
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
              placeholder="جستجو"
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
            <div class="box"  v-for="(item, i) in (posts)">
              <Post :items="item" />
            </div>



          </div>
          <v-pagination
            v-model="pagination.currentPage"
            :length="pagination.totalPages"
            @update:modelValue="handlePageChange"
          ></v-pagination>
        </div>
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
import TextInput from "@/components/TextInput/TextInput";
import SelectInput from "@/components/SelectInput/SelectInput";
import { postService  } from '~/services'


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
    TextInput,
    SelectInput
  },
  data () {
    return {
      loading: false,
      searchText: '',
      itemsFilter: ['پربازدید ترین', 'پرفروش ترین', 'محبوب ترین', 'جدیدترین','ارزانترین','گرانترین'],
      filter: 'جدیدترین',
      posts:[],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        pageSize: 10
      },

    }
  },
  computed: {
    // محاسبه آیتم‌های فعلی صفحه به صورت کلاینت‌ساید
    paginatedItems() {
      const start = (this.pagination.currentPage - 1) * this.pagination.pageSize;
      return this.items.slice(start, start + this.pagination.pageSize);
    },

    // محاسبه تعداد کل صفحات
    totalPages() {
      return Math.ceil(this.items.length / this.pagination.pageSize);
    }
  },

  methods: {
    handlePageChange(newPage) {
      this.pagination.currentPage = newPage;
    },
    async getPost() {
      try {
        const res = await postService.getPost()
        this.posts = res?.entity?.posts?.data
        this.pagination.totalPages = Math.ceil(
          this.posts.length / this.pagination.pageSize
        );
        setTimeout(() => {
          this.posts = res?.entity?.posts?.data
        }, 2000);
      } catch (error) {
        console.error('خطا در دریافت کاربران:', error)
      }
    },
  },
  mounted() {
    this.getPost();
  }
};
</script>

<style lang="scss" scoped>
.productMain{
  padding: 0 0;
  @include breakpoint(medium) {
    padding: 50px 10%;
  }
  &-lists{
    padding: 50px 5%;
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
    justify-content: flex-start;
    gap: 15px;
    .box{
      max-width: 47%;
      flex: 47%;
      @include breakpoint(medium) {
        max-width: 24%;
        flex: 24%;
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
    margin-top: 0px;
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

</style>
