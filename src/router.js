import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import View from './views/View.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/help',
      name: 'help',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "help" */ './views/Help.vue')
    },
    {
      path: '*',
      component: Home
    }
  ]
})
