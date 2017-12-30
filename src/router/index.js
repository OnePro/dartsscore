import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import Game501 from '@/components/Game501'
import Cricket from '@/components/GameCricket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/g501',
      name: 'Game501',
      component: Game501
    },
    {
      path: '/cricket',
      name: 'Cricket',
      component: Cricket
    }
  ]
})
