import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueScrollProgress from 'vue-scroll-progress'
import Header from 'v-header'
import VueGoogleCharts from 'vue-google-charts'
import vuetify from './plugins/vuetify'

Vue.use(VueGoogleCharts)
Vue.use(VueScrollProgress)
Vue.use(Header)

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
