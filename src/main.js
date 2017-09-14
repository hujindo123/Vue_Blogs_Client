// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from '@/views/index'
import itemGame from '@/components/index/itemGame'
import itemNews from '@/components/index/itemNews'
import register from '@/views/register'
import login from '@/views/login'
import article from '@/views/article'
import forget from '@/views/forgetPassword'
import NotEmail from '@/views/notAvailableEmail'
import user from '@/views/user/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/itemGame',
    children: [
      {
        path: '/itemGame',
        component: itemGame
      },
      {
        path: '/itemNews',
        component: itemNews
      }
    ]
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/forget',
    component: forget
  },
  {
    path: '/NotEmail',
    component: NotEmail
  },
  {
    path: '/article',
    component: article
  },
  {
    path: '/user',
    component: user
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
