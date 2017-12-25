// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import Toasted from 'vue-toasted' // https://github.com/shakee93/vue-toasted#usage

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
import StartPage from '@/components/StartPage'
import Mainmenu from '@/components/MainMenu'
import Player from '@/components/Player'
import Table501 from '@/components/Table501'

Vue.use(BootstrapVue)
Vue.use(Toasted)
Vue.component(StartPage.name, StartPage)
Vue.component(Mainmenu.name, Mainmenu)
Vue.component(Player.name, Player)
Vue.component(Table501.name, Table501)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
