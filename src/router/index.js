import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import StaffView from '@/views/StaffView.vue'
import CustomerView from '@/views/CustomerView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgetView from '@/views/ForgetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/staff',
      name: 'staff',
      component: StaffView
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/forget',
      name: 'forget',
      component: ForgetView
    },
  ]
})

export default router
