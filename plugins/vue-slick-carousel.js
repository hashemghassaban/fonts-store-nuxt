import Vue from 'vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// // require styles
// // import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper /* { default global options } */)
import VueSlider from 'vue-slider-component'
import Flickity from 'vue-flickity'
import 'vue-slider-component/theme/antd.css'
Vue.component('VueSlider', VueSlider)
Vue.component('VueFlickity', Flickity)
