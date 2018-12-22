import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { AUTH } from '../plugins/firebase'

Vue.use(VueRouter)
const Router = new VueRouter({
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach((to, from, next) => {
  const currentUser = AUTH.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)


  if (requiresAuth && !currentUser) next('/login')
  else if (!requiresAuth && currentUser) next('/')
  else next()
})


export default Router



