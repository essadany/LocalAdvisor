import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/LoginPage.vue'),
    },
    {
      path: '/places',
      name: 'places',
      component: () => import('../views/places/PlacesList.vue'),
    },
    {
      path: '/places/:id',
      name: 'place',
      component: () => import('../views/places/PlaceDetails.vue'),
    },
    {
      path: '/places/:id/edit',
      name: 'edit-place',
      component: () => import('../views/places/PlaceEdit.vue'),
    },
    {
      path: '/places/new',
      name: 'new-place',
      component: () => import('../views/places/PlaceEdit.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/users/UserProfile.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoriesList.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    },

  ],
})

export default router
