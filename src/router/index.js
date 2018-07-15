import Vue from 'vue'
import Router from 'vue-router'
import Admin from './admin'
import Code from './code'
Vue.use(Router);

export default new Router({
  routes: [
    ...Admin,
    ...Code,
  ]
})
