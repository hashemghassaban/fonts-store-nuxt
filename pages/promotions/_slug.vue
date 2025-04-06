<template>
  <client-only>
    <div class="productMain ">
      <Loading v-if="loading" />
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
          <h1 class="text"> {{promotion?.title}}</h1>
        </div>

      </section>
      <section class="productMain-lists">
        <div class="productMain-lists-filter">
          <div class="searchBlock">
            <form @submit.prevent="handleSearch">
            <v-text-field
              v-model.trim="searchText"
              dense
              filled
              rounded
              clearable
              placeholder="جستجو فونت"
              @click:clear="clear()"
              prepend-inner-icon="mdi-magnify"
              class="pt-6 shrink expanding-search"
            ></v-text-field>
            </form>
          </div>
          <div class="filter">
            <v-select
              :items="itemsFilter"
              v-model="sort"
              label="به ترتیب"
              outlined
              item-text="name"
              item-value="value"
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
        <div class="productMain-lists-block"  v-if="product?.length > 0">
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
        <div class="productMain-lists-block not-pro"  v-else>
          <img src="~/assets/img/icon/not-pro.png" alt="not pro">
          <span>  محصولی یافت نشد</span>
        </div>
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
import { productService , categoryService} from '~/services'


export default {
  components: {
    SvgIcon,
    VueSlickCarousel,
    TextInput,
    SelectInput
  },
  data () {
    return {
      searchText: '',
      itemsFilter: [
        { name: 'پربازدید ترین', value: 1 },
        { name: 'پرفروش ترین', value: 2 },
        { name: 'جدیدترین', value: 4 },
        { name: 'ارزانترین', value: 5 },
        { name: 'گرانترین', value: 6 }
      ],
      sort: 1,
      loading:false,
      page: 1,
      itemsPerPage: 10,
      totalItems: 0,
      category:[],
      product:[],
      promotion:[],
      dataProduct:[]


    }
  },
  async asyncData({ params }) {
    const dataProduct = await fetch(
      `https://linotyper.com/api/v1/promotions/${params.slug}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    ).then((res) => res.json());
    return { dataProduct };
  },
  watch: {
    '$route.query.search': {
      handler(newVal) {
        if (newVal) {
          this.searchText = newVal
          this.getProductAll()
        }
      },
      immediate: true
    },
    itemsPerPage(newVal) {
      this.page = 1 // Reset page when itemsPerPage changes
      this.getProductAll()
    },
    sort(newVal) {
      setTimeout(()=>{
        this.getProductAll(newVal)

      },500)
    }
  },
  computed: {
    currentPath() {
      return this.$route.params.slug
    },
  },
  methods: {
    clear(){
      this.searchText = ''
      this.getProductAll()
    },
    handleSearch(){
      this.getProductAll(this.sort)
    },
    refreshData(newValue) {
      if(newValue ){
        this.getProductAll()
      }

    },
    async getProductAll(sort) {
      this.loading=true

      const data = {
        sort : sort,
        ...(this.searchText.length > 0  && {
          search: this.searchText,
        })
      }
      await fetch(
        `https://linotyper.com/api/v1/promotions/${this.currentPath}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )
        .then((response) => response.json())
        .then((res) => {
          this.product = res?.entity?.products?.data
          this.promotion = res?.entity?.promotion
          this.loading = false;
          this.totalItems = res?.entity?.products?.total
        })
    },

  },
  mounted() {
    this.getProductAll();

  },
  head() {
    return {
      title: this.dataProduct?.entity?.promotion?.title + ' - لاینو تایپ' ,

      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.dataProduct?.entity?.promotion?.description,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.dataProduct?.entity?.promotion?.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.dataProduct?.entity?.promotion?.title + ' -  ' ,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.dataProduct?.entity?.promotion?.icon_url
                 },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.dataProduct?.entity?.promotion?.description,
        },
      ],
    }
  },
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
      max-width: 50%;
      @include breakpoint(medium) {
        width: 25%;
        flex: 25%;
        max-width: 25%;
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
.not-pro{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 100px 0;
  width: 100%;
  margin: 60px auto 100px;
  border: 1px solid #ccc;
  border-radius: 10px;
  span{
    font-weight: 800;
    color: #ff7a00 !important;
    margin-top: 15px;
    text-align: center;
  }
  img{
    width: 120px;
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
      max-width: 100%;
      flex: 100%;
      @include breakpoint(medium) {
        max-width: 50%;
        flex: 49%;
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
