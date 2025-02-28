<template>
  <div id="timer" class="timer">
    <SvgIcon
      name="timer"
      color=#FF7A00
      size="28px"
      className="rounded-full"
      v-if="formattedTime !== '00:00'"
    />
    <span v-if="formattedTime !== '00:00'">
  {{ formattedTime }}
    </span>
    <div class="controls" v-else>
      <button @click="resetCountdown">ارسال مجدد</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    targetMinutes: {
      type: Number,
      default: 5,
      validator: value => value > 0
    },
    targetSeconds: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value < 60
    },
    showControls: {
      type: Boolean,
      default: true
    },
    onComplete: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      totalSeconds: (this.targetMinutes * 60) + this.targetSeconds,
      remainingSeconds: (this.targetMinutes * 60) + this.targetSeconds,
      running: false,
      intervalId: null
    }
  },

  computed: {
    formattedTime() {
      const mins = Math.floor(this.remainingSeconds / 60)
      const secs = this.remainingSeconds % 60

      if (this.remainingSeconds <= 0) {
        return '00:00'
      }

      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
  },

  methods: {
    startCountdown() {
      if (!this.running && this.remainingSeconds > 0) {
        this.running = true
        this.intervalId = setInterval(() => {
          this.remainingSeconds--

          if (this.remainingSeconds <= 0) {
            this.stopCountdown()
            this.onComplete()
          }
        }, 1000)
      }
    },

    stopCountdown() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.running = false
      }
    },

    resetCountdown() {


      this.remainingSeconds = this.totalSeconds
      setTimeout(()=>{
        this.stopCountdown()
        this.startCountdown()
      },1000)

    }
  },

  mounted() {
    if (this.showControls || !this.running) {
      this.startCountdown()
    }
  },

  beforeDestroy() {
    this.stopCountdown()
  }
}
</script>

<style scoped >
.timer {
  display: flex;
  margin: 10px 0;
  width: 100%;
  align-items: center;
  gap: 10px;
  span{
    font-size: 20px;
    color: #ff5722;
  }
}

.controls {
  margin-top: 0;
  font-size: 14px;
}

.controls button {
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  background: #ff7a00;
  color: #fff;
  border-radius: 6px;

}

.controls button:hover {
  /*background-color: #f0f0f0;*/
}
</style>
