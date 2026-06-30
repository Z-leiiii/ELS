import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: '/leave-application',
          name: 'leave-application',
          component: () => import('../views/CivilServiceForm.vue')
        },
        {
          path: '/simple-leave',
          name: 'simple-leave',
          component: () => import('../views/LeaveApplication.vue')
        },
        {
          path: '/admin-applications',
          name: 'admin-applications',
          component: () => import('../views/AdminApplications.vue')
        },
        {
          path: '/my-applications',
          name: 'my-applications',
          component: () => import('../views/MyApplications.vue')
        },
        {
          path: '/attendance',
          name: 'attendance',
          component: () => import('../views/Attendance.vue')
        },
        {
          path: '/records',
          name: 'records',
          component: () => import('../views/Records.vue')
        },
        {
          path: '/reports',
          name: 'reports',
          component: () => import('../views/Reports.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('../views/Settings.vue')
        },
        {
          path: '/faculty-mood-ratings',
          name: 'faculty-mood-ratings',
          component: () => import('../views/FacultyMoodRatings.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
