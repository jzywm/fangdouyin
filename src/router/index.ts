import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<div>Home Page</div>' },
    },
    {
      path: '/about',
      name: 'about',
      component: { template: '<div>About Page</div>' },
    },
  ],
})

export default router
