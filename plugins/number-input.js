import Vue from 'vue';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import ToomanSvg from '@/components/tomanSvg/tomanSvg.vue'

const components = { VueNumberInput, ToomanSvg}
   
Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})
// Or
Vue.component(VueNumberInput.name, VueNumberInput);
// Or
Vue.component('vue-number-input', VueNumberInput);

