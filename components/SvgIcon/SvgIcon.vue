<template>
  <i
    :class="'font-'+name"
    :style="{'color':color,'font-size':size }"></i>

</template>

<script>

export default {
  props:{
    name:{
      type:String,
      default:'',
    },

    color:{
      type:String,
      default:''
    },

    size:{
      type:String,
      default:null
    },
  },

}

</script>
<style scoped lang="scss">



  i{
    &:before{
      color: inherit;
    }
  }


</style>
