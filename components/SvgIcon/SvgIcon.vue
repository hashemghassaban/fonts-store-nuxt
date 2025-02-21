<template>
  <svg :style="{ height:Height, width:Width,
                 'min-height':Height,'min-width':Width,
                 'max-height':Height,'max-width':Width,
                 color,fill,stroke }" >
    <use :xlink:href="src"></use>
  </svg>
</template>

<script>

export default {
    props:{
      name:{
        type:String,
        default:'',
      },
      width:{
        type:String,
        default:'',
      },
      height:{
        type:String,
        default:'',
      },
      color:{
        type:String,
        default:''
      },
      stroke:{
        type:String,
        default:'transparent'
      },
      fill:{
        type:String,
        default:''
      },
      size:{
        type:String,
        default:null
      },
    },
    computed: {
        src() {
            return  `${require("@/components/SvgIcon/SvgIcon.svg")}#${this.name}`;
        },
        Width(){
          if(this.size) return this.size
          return this.width
        },
        Height(){
          if(this.size) return this.size
          return this.height
        }
    }
}

</script>
