import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Education from '../views/Education.vue'
import WorkExpriences from '../views/WorkExp.vue'
import Demo from '../views/Demo.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'About',
    component: About
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/education',
    name: 'Education',
    component: Education
  },
  {
    path: '/WorkExpriences',
    name: 'WorkExpriences',
    component: WorkExpriences
  },
  {
    path: '/Demo',
    name: 'Demo',
    component: Demo
  }
]

const router = new VueRouter({
  routes
})

export default router
