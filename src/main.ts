import Vue from 'vue'
import VueCompositionApi from "@vue/composition-api"
import { update, get } from "@/compoonent/a"
import App from './App.vue'
import store from './store'
import { ref } from "@vue/composition-api"

Vue.config.productionTip = false

Vue.use(VueCompositionApi)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

declare global {
  interface Window { update: any, ref: any, get: any }
}

window.get = get
window.update = update
window.ref = ref


