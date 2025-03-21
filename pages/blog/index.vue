<template>
  <client-only>
    <div class="productMain ">
      <Loading v-if="loading" />
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
          <h1 class="text">لاینومگ</h1>
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
                @click:clear="clear()"
                placeholder="جستجو مقاله"
                prepend-inner-icon="mdi-magnify"
                class="pt-6 shrink expanding-search"
              ></v-text-field>
            </form>
          </div>
          <div class="filter">
            <v-select
              :items="itemsFilter"
              v-model="categoryId"
              label="دسته بندی های وبلاگ"
              outlined
              item-text="name"
              item-value="id"
              @change="changeRoute"
            >
              <template #prepend-inner>
                <img src="~/assets/img/icon/category.png" width="20px" style="margin-left: 10px">
              </template>
            </v-select>
          </div>
        </div>
        <div class="productMain-lists-block" v-if="posts?.length >0">
          <div class="latest-font-block">
            <div class="box"  v-for="(item, i) in (posts)">
              <Post :items="item" />
            </div>
          </div>
          <v-pagination
            v-model="page"
            :length="Math.ceil(totalItems / itemsPerPage)"
            :total-visible="7"
            class="my-4"
            @input="getPost(null)"
          ></v-pagination>
        </div v-if>
        <div class="productMain-lists-block not-pro"  v-else>
          <img src="~/assets/img/icon/not-pro.png" alt="not pro">
          <span>  مقاله ای یافت نشد</span>
        </div>
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
    title: "به وبلاگ لاینوتایپ خوش آمدید.",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "به وبلاگ لاینوتایپ خوش آمدید. در این بخش به آخرین مقالات مرتبط با دنیای فونت و طراحی دسترسی خواهید داشت.",
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
      itemsFilter: [],
      categoryId: null,
      page:1,
      posts:[],
      itemsPerPage: 12,
      totalItems: 0,
    }
  },
  watch: {
    itemsPerPage(newVal) {
      this.page = 1 // Reset page when itemsPerPage changes
      this.getPost()
    },
    categoryId(newVal) {
      console.log(newVal)
      setTimeout(()=>{
        this.getPost(this.params.category , newVal)

      },1000)
    },
  },
  methods: {
    clear(){
      this.searchText = ''
      this.getPost()
    },
    changeRoute(id){
      this.getPost(id)
    },
    handleSearch(){
      this.getPost(this.categoryId)
    },
    async getPost(categoryId ) {
      this.loading= true
      const data = {
        ...(this.searchText.length > 0  && {
          search: this.searchText,
        } ),
        ...( categoryId && { category:  categoryId }),
        ...( this.page && { page:  this.page })

      }
      try {
        const res = await postService.getPost(data)
        setTimeout(() => {
          this.posts = res?.entity?.posts?.data
          this.totalItems = res?.entity?.posts?.total
          this.itemsFilter = res?.entity.categories

          this.loading= false
        }, 2000);
      } catch (error) {
        this.$toast.error(error, {
          timeout: 4000,
        })
      }
    },
  },
  mounted() {
    this.getPost(this.sort)
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
      max-width: 47%;
      flex: 47%;
      @include breakpoint(medium) {
        max-width: 24%;
        flex: 24%;
      }
    }
  }
}

</style>
