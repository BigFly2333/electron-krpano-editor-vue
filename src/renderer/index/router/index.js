import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'myIndex',
      component: require('@/pages/my/Index').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
