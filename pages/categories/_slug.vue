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
          <h1 class="text">دسته بندی {{ dataCategory.name }} </h1>
        </div>
      <section class="productMain-lists">
        <div class="productMain-lists-filter">
          <div class="searchBlock">
            <form @submit.prevent="handleSearch">
              <v-text-field
                v-model.trim="searchText"
                dense
                filled
                rounded
                @click:clear="clear()"
                clearable
                placeholder="جستجو اسم فونت"
                prepend-inner-icon="mdi-magnify"
                class="pt-6 shrink expanding-search"
              ></v-text-field>
            </form>
          </div>
          <div class="filter">
            <v-select
              :items="formattedItems"
              v-model="sort"
              label="دسته بندی ها "
              outlined
              item-text="text"
              item-value="id"
              no-data-text="زیر دسته ای موجود نیست"
            >
              <template #prepend-inner>
               <img src="~/assets/img/icon/category.png" width="20px" style="margin-left: 10px">
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
            @input="getCategories"
          ></v-pagination>
        </div>
        <div class="productMain-lists-block not-pro"  v-else>

          <img src="~/assets/img/icon/not-pro.png" alt="not pro">
          <span>   محصولی یافت نشد</span>
        </div>
      </section>
      <div class="type-font">
        <h3>{{ dataCategory.name }}</h3>
        <p v-html=" dataCategory.description "></p>
      </div>
    <div class="category">
        <div class="category-block">
          <div class="col-3" v-for="(item, i) in (category)" :key="i">
            <nuxt-link :to="'/categories/' + item.id" >
            <div  class="box" >
              <div class="count">+{{item?.products_count}}</div>
              <div class="icon">
                <img
                  :src="require(`~/assets/img/element/box0${i+1}.png`)"
                  :alt="item?.name"
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
            </nuxt-link>
          </div>


        </div>
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
import { categoryService } from '~/services'


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
      itemsFilter: [],
      sort: 1,
      page: 1,
      loading:false,
      itemsPerPage: 10,
      totalItems: 0,
      category:[],
      product:[],
      title:'',
      dataCategory:[],
      description:''

    }
  },

  watch: {
    itemsPerPage(newVal) {
      this.page = 1 // Reset page when itemsPerPage changes
      this.getProductAll()
    },
    '$route.query.search': {
      handler(newVal) {
        if (newVal) {
          this.searchText = newVal
          this.getCategories()
        }
      },
      immediate: true
    },
    sort(newVal) {
      console.log(newVal)
      setTimeout(()=>{
        this.$router.push('/categories/'+ newVal)

      },500)
    }
  },
  computed: {
    params() {
      return this.$route?.params?.slug
    },
    formattedItems() {
      const formatItem = (item, level = 0) => ({
        id: item.id,
        text: ' '.repeat(level * 2) + (level > 0 ? ' ── ' : '') + item.name  ,
        icon: item.icon_url
      })

      const flattenCategories = (categories, level = 0) => {
        return categories.reduce((acc, category) => {
          acc.push(formatItem(category, level))
          if (category.children && category.children.length) {
            acc.push(...flattenCategories(category.children, level + 1))
          }
          return acc
        }, [])
      }

      return flattenCategories(this.category)
    }

  },
  methods: {
    clear(){
      this.searchText = ''
      this.getCategories()
    },
    handleSearch(){
      this.getCategories()
    },
    changeCategory(id){
      this.$router.push('/categories/'+id)
    },
    refreshData(newValue) {
      if(newValue ){
        this.getCategories()
      }
    },

    async getCategories() {
      this.loading=true

        const data = {

          ...(this.searchText.length > 0  && {
            search: this.searchText,
          })
        }
      await fetch(
        `https://linotyper.com/api/v1/categories/${this.params}/products`,
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
          console.log(res)
          this.itemsFilter =  res?.entity.category?.children
          this.dataCategory = res?.entity?.category
          this.title = res?.entity?.category?.seo?.title
          this.description = res?.entity?.category?.seo?.description
          this.product = res?.entity?.products?.data
          this.getCategoriesAll()
          this.totalItems =  res?.entity?.products?.total
          this.loading=false
        })
    },


    async getCategoriesAll() {
      this.loading=true
      try {
        const product = await categoryService.getCategoryAll()
        this.category = product?.entity


        this.loading=false

      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
        this.loading=false
      }
    },

  },
  mounted() {
    this.getCategories()


  },
  head() {
    return {
      title:  this.title + ' - لاینو تایپ' ,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.title + ' - لاینو تایپ' ,
        },
        {
          hid: 'description',
          name: 'description',
          content: this?.description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content:  this.title + ' - لاینو تایپ' ,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.category.icon,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this?.description,
        },
      ],
    }
  },
};
</script>

<style lang="scss" scoped>
.title{
  padding-top: 40px;
}
.category{
  padding:0 0 50px;
  &-block{
    display: flex;
    margin-top: 50px;
    padding: 0 ;
    justify-content: flex-start;
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
    padding: 50px  5% 0;
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
  border-bottom: 1px solid #ccc;

  @include breakpoint(medium) {
    padding: 0;
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
  .v-select__slot{
    .v-input__append-inner{
      display: none;
    }
  }
}



</style>
