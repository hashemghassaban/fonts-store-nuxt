<template>
  <client-only>
    <div class="productMain ">
      <Loading v-if="loading" />
      <section class="category">
        <div class="title">
          <div class="icon">
            <SvgIcon
              name="edit"
              color="#F15A24"
              size="1.3rem"
              className="rounded-full"
            />
          </div>
          <h2 class="text">طراحان</h2>
        </div>
      </section>
      <section class="productMain-lists">
        <div class="productMain-lists-block"  v-if="designer?.length > 0">
          <div class="latest-font-block">
            <div class="box" v-for="(item, i) in designer" >
                <nuxt-link :to="`/designer/detail/`+ item.id" class="designer">
                  <div class="photo">
                    <img :src="item.icon_url" :alt="item.title">
                  </div>
                  <div class="name">{{item.title}}</div>
                </nuxt-link>
            </div>

          </div>
          <v-pagination
            v-model="page"
            :length="Math.ceil(totalItems / itemsPerPage)"
            :total-visible="7"
            class="my-4"
            @input="getDesigner"
          ></v-pagination>
        </div>
        <div class="productMain-lists-block not-pro"  v-else>
          <img src="~/assets/img/icon/not-pro.png" alt="not pro">
          <span> طراحی یافت نشد</span>
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
import { designerService } from '../../services'


export default {
  head: {
    titleTemplate: "",
    title: "طراحان - لاینو تایپ",
    htmlAttrs: {
      lang: "fa",
    },
  },
  meta: [
    {
      hid: "og:title",
      name: "og:title",
      content: "طراحان - لاینو تایپ",
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
      page: 1,
      loading:false,
      itemsPerPage: 10,
      totalItems: 0,
      designer:[],

    }
  },

  watch: {
    itemsPerPage(newVal) {
      this.page = 1 // Reset page when itemsPerPage changes
      this.getDesigner()
    },

  },
  computed: {

    params() {
      return this.$route.query
    },

  },
  methods: {
    refreshData(newValue) {
      if(newValue ){
        this.getDesigner()
      }

    },
    async getDesigner() {
      this.loading=true
      try {
        const designer = await designerService.getDesigner()
        this.designer = designer?.entity?.data
        this.totalItems = designer?.entity?.total
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
    this.category = this.$store.state.categories
    this.getDesigner();

  }
};
</script>

<style lang="scss" scoped>
.productMain{
  padding: 0 0;
  margin-top: 170px!important;
  @include breakpoint(medium) {
    padding: 0 10%;
  }
  &-lists{
    padding: 0 5%;
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
.designer{
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  display: block;
  .photo{
    height: 300px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .name{
    height: 40px;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
    font-weight: 800;
    background: #535353;
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
    gap: 20px;
    .box{
      max-width: 100%;
      flex: 100%;
      @include breakpoint(medium) {
        max-width:23.3%;
        flex: 24.3%;
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

    .v-select__slot{
      .v-input__append-inner{
        display: none;
      }
    }

}

</style>
