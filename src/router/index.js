import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import more from '@/components/index/more'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello,
      children: {
        path: '/more',
        component: more
      }
    }
  ]
})
