import Vue from 'vue'
import App from './App.vue'
import './index.scss'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
