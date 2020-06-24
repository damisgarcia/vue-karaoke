import Vue from 'vue'

import Splitting from 'splitting'

import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.Splitting = Splitting

new Vue({
  render: h => h(App),
}).$mount('#app')
