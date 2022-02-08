import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: () => import('../views/Todo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
