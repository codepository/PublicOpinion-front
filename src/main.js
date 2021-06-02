import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import router from './router'
import util from './util'
Vue.use(ViewUI)
Vue.use(util)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')