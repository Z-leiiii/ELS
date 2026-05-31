<template>
  <div class="flex h-screen w-screen bg-gray-100 overflow-hidden">

    <!-- Mobile Menu Toggle -->
    <button
      @click="sidebarOpen = !sidebarOpen"
      class="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
    >
      <Menu v-if="!sidebarOpen" class="w-5 h-5 text-gray-600" />
      <X v-else class="w-5 h-5 text-gray-600" />
    </button>

    <!-- Overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed lg:relative h-full w-64 bg-[#000033] shadow-lg z-40 transition-transform duration-300"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="p-6">
        <h1 class="text-2xl font-bold text-blue-600">ELS</h1>
        <p class="text-white-600">System</p>
      </div>

      <nav class="mt-4 space-y-1 px-3">

        <router-link to="/dashboard" class="nav-item">
          <LayoutDashboard class="icon" />
          Dashboard
        </router-link>

        <router-link v-if="userRole === 'ADAS'" to="/admin-applications" class="nav-item">
          <FileCheck class="icon" />
          Applications
        </router-link>
        
        <router-link v-if="userRole !== 'ADAS'" to="/leave-application" class="nav-item">
          <FilePlus class="icon" />
          Apply
        </router-link>
        
        <router-link v-if="userRole !== 'ADAS'" to="/my-applications" class="nav-item">
          <FileCheck class="icon" />
          My Applications
        </router-link>
        
        <router-link to="/attendance" class="nav-item">
          <Calendar class="icon" />
          Attendance
        </router-link>

        <router-link to="/records" class="nav-item">
          <Users class="icon" />
          Records
        </router-link>

        <router-link to="/reports" class="nav-item">
          <BarChart class="icon" />
          Reports
        </router-link>

        <router-link to="/settings" class="nav-item">
          <Settings class="icon" />
          Settings
        </router-link>

        <button @click="logout" class="nav-item text-red-600 w-full">
          <LogOut class="icon" />
          Logout
        </button>

      </nav>
    </aside>

    <!-- MAIN -->
    <div class="flex flex-col flex-1 w-full min-w-0 overflow-hidden">

      <!-- HEADER -->
      <header class="bg-white border-b shadow-sm flex items-center justify-between px-6 py-4">
        <h2 class="text-blue-600 font-bold text-xl">{{ pageTitle }}</h2>

        <div class="flex items-center gap-4">

          <!-- Search -->
          <div class="relative">
            <Search class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              class="pl-9 pr-3 py-2 border rounded-lg text-sm"
              placeholder="Search..."
            />
          </div>

          <!-- Bell -->
          <div class="relative">
            <Bell class="w-5 h-5 text-gray-600" />
            <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>

          <!-- User -->
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
              {{ currentUser.name.charAt(0) }}
            </div>
          </div>

        </div>
      </header>

      <!-- CONTENT -->
      <main class="flex-1 overflow-auto p-6 w-full">
        <router-view />
      </main>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  LayoutDashboard,
  FileText,
  FilePlus,
  FileCheck,
  Calendar,
  Users,
  BarChart,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(false)

const userRole = ref(localStorage.getItem('userRole') || 'ADAS')

const currentUser = ref({
  name: localStorage.getItem('userEmail')?.split('@')[0] || 'User',
  role: userRole.value
})

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/admin-applications': 'Applications',
    '/leave-application': 'Apply Leave',
    '/attendance': 'Attendance',
    '/my-applications': 'My Applications',
    '/records': 'Records',
    '/reports': 'Reports',
    '/settings': 'Settings'
  }
  return titles[route.path] || 'Dashboard'
})

const logout = () => {
  localStorage.removeItem('userRole')
  localStorage.removeItem('userEmail')
  router.push('/login')
}
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-blue-50 hover:text-black transition;
}

.icon {
  width: 18px;
  height: 18px;
}
</style>