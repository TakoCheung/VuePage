import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueScrollProgress from 'vue-scroll-progress'
import Header from 'v-header'
import VueGoogleCharts from 'vue-google-charts'
import vuetify from './plugins/vuetify'
import { BootstrapVueIcons,BIcon,BButton } from 'bootstrap-vue'
import VVisible from 'v-visible'

Vue.use(VVisible)
Vue.component('BIcon', BIcon)
Vue.component('BButton', BButton)
Vue.use(BootstrapVueIcons)
Vue.use(VueGoogleCharts)
Vue.use(VueScrollProgress)
Vue.use(Header)

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
