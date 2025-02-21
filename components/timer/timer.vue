<template>
  <div class="d-flex flex-column align-center justify-center">
      <div v-if="!timeEnd" class="  timer-text d-inline-flex timer">
          <div >ارسال مجدد تا </div>
          <div class=" mm-ss-text" >{{text}}</div>
          <div>دقیقه </div>
      </div>
      <div v-else @click="restart" class=" send-again-text timer">
        ارسال مجدد
      </div>
  </div>
</template>

<script>
export default {
    props:{
        // حداکثر زمان به ثانیه
        seconds:{
          type:Number,
          default:120,
        },
        autoStart:{
            type:Boolean,
            default:false,
        },
    },
    data:()=>({
        time:120,
        timer:null,
    }),
    computed:{
        text(){
            return new Date(this.time*1000).toISOString().substr(14,5);
        },
        timeEnd(){
            return this.time<=0
        }
    },
    methods:{
        start(){
            if(this.timer) this.end()
            this.time  = this.seconds
            this.timer = setInterval( ()=> {
                if(this.time>0)
                    this.time-=1
                else
                    this.end()
            } ,1000 )
        },
        restart(){
            this.$emit('restart')
            this.start()
        },
        end(){
            clearInterval(this.timer)
            this.timer = null
        },
    },
    mounted(){
        if(this.autoStart) this.start()
    }
}
</script>

<style>
.timer-text{
    border-bottom:1px solid var(--v-grey-lighten4);
    user-select: none;
}

.mm-ss-text{
    width: 50px ;
    max-width: 50px ;
    min-width: 50px ;
    text-align: center;
}

.send-again-text{
    cursor:pointer;
    border-bottom:1px solid var(--v-grey-lighten4);
    user-select: none;
}
.timer{
    font-size: 14px;
    color: #8d8d8d;
    gap: 0px;
    margin: 0 33px;
}
</style>
