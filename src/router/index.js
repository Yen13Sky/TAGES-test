import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoritesView')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
