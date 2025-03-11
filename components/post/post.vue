<template>
  <div class="post">
    <div class="post-list">
      <nuxt-link  :to="'/blogDetail/'+items.id"
      >
      <div class="post-list-top">
        <div class="background">
          <img :src="items.thumbnail_url" :alt="items.title">
        </div>

      </div>
      <div class="post-list-bottom">
        <div class="post-top">
          <h2 class="type">
            {{items.title}}
          </h2>
          <span class="date">      {{
              new Date(items.created_at).toLocaleString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}</span>
        </div>
      </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";

export default {
  components: {
    SvgIcon,

  },
  props: {
    typeProduct: {
      type: String,
      default: null,
    },
    items:{
      type: Array,
      default: [],
    }
  },
}
</script>
<style scoped lang="scss">
.post{
  position: relative;
  &-list{
    &-top{
      border-radius: 10px;
      overflow: hidden;
  .background{
    display: flex;
    width: 100%;
    gap: 35px;
    height: 300px;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

    }
    &-bottom{
      display: flex;
      flex-direction: column;
      .post-top{
        display: flex;
        justify-content: space-between;
        padding: 12px 10px;
        align-items: flex-start;
        flex-direction: column;
        flex-direction: column;

        @include breakpoint(small) {
          align-items: center;
        }
        .type{
          font-size: 14px;
          color: #F15A24;
        }
        .date{
          color: #cbcbcb;
        }

      }
.post-bottom{
  padding: 0 24px 15px;
  position: relative;
  .title{
    font-size: 17px !important;
    font-weight: bold;
  }
  span{
    font-size: 12px;
    color: #ccc;
  }
  i{
    position: absolute;
    left: 26px;
    top: 26px;
  }

}

    }
  }
}


</style>
