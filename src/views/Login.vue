<template>
  <div class="w-screen h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">

    <div class="w-full max-w-md">

      <!-- Header -->
      <div class="text-center mb-6">
        <div class="mx-auto h-14 w-14 bg-blue-600 rounded-full flex items-center justify-center">
          <span class="text-white text-2xl font-bold">ELS</span>
        </div>

        <h2 class="mt-4 text-3xl font-extrabold text-blue-600">
          ELS System
        </h2>

        <p class="mt-2 text-sm text-gray-600">
          Leave Management System
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-xl shadow-lg p-8">

        <form class="space-y-6" @submit.prevent="handleLogin">

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Login As
            </label>

            <div class="grid grid-cols-2 gap-3">

              <button
                type="button"
                @click="userRole = 'ADAS'"
                :class="[
                  'py-2 border rounded-lg text-sm font-medium transition',
                  userRole === 'ADAS'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                ]"
              >
                ADAS
              </button>

              <button
                type="button"
                @click="userRole = 'Faculty'"
                :class="[
                  'py-2 border rounded-lg text-sm font-medium transition',
                  userRole === 'Faculty'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                ]"
              >
                Faculty
              </button>

            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div class="mt-1 relative">

              <input
                v-model="loginForm.email"
                type="email"
                required
                placeholder="Enter your email"
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <Mail class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Password
            </label>

            <div class="mt-1 relative">

              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Enter your password"
                class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <Lock class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-2.5"
              >
                <Eye
                  v-if="showPassword"
                  class="w-4 h-4 text-gray-400"
                />
                <EyeOff
                  v-else
                  class="w-4 h-4 text-gray-400"
                />
              </button>

            </div>
          </div>

          <!-- Remember + Forgot -->
          <div class="flex items-center justify-between text-sm">

            <label class="flex items-center gap-2">
              <input
                v-model="loginForm.rememberMe"
                type="checkbox"
                class="text-blue-600"
              />
              Remember me
            </label>

            <a href="#" class="text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>

          </div>

          <!-- Error -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3"
          >
            {{ errorMessage }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >

            <span v-if="!isLoading">
              Sign in
            </span>

            <span v-else>
              Signing in...
            </span>

          </button>

        </form>

        <!-- Demo Accounts -->
        <div class="mt-6 border-t pt-4 text-sm text-gray-600">

          <p class="text-center font-medium mb-3">
            Demo Accounts
          </p>

          <div class="space-y-2">

            <div class="bg-gray-50 rounded p-2">
              <p class="font-medium text-gray-900">
                ADAS Account
              </p>
              <p>Email: adas@university.edu</p>
              <p>Password: admin123</p>
            </div>

            <div class="bg-gray-50 rounded p-2">
              <p class="font-medium text-gray-900">
                Faculty Account
              </p>
              <p>Email: faculty@university.edu</p>
              <p>Password: faculty123</p>
            </div>

          </div>

        </div>

      </div>

      <!-- Footer -->
      <div class="text-center text-sm text-gray-600 mt-6">

        <p>
          © 2026 ELS System. All rights reserved.
        </p>

        <div class="mt-2 space-x-4">

          <a href="#" class="hover:text-gray-900">
            Privacy Policy
          </a>

          <a href="#" class="hover:text-gray-900">
            Terms of Service
          </a>

          <a href="#" class="hover:text-gray-900">
            Contact Support
          </a>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Mail,
  Lock,
  Eye,
  EyeOff
} from 'lucide-vue-next'

const router = useRouter()

const userRole = ref<'ADAS' | 'Faculty'>('ADAS')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

const handleLogin = async () => {

  isLoading.value = true
  errorMessage.value = ''

  try {

    await new Promise(resolve =>
      setTimeout(resolve, 1500)
    )

    if (userRole.value === 'ADAS') {

      if (
        loginForm.value.email === 'adas@university.edu' &&
        loginForm.value.password === 'admin123'
      ) {

        localStorage.setItem('userRole', 'ADAS')
        router.push('/dashboard')

      } else {

        errorMessage.value =
          'Invalid ADAS credentials'

      }

    } else {

      if (
        loginForm.value.email === 'faculty@university.edu' &&
        loginForm.value.password === 'faculty123'
      ) {

        localStorage.setItem('userRole', 'Faculty')
        router.push('/dashboard')

      } else {

        errorMessage.value =
          'Invalid Faculty credentials'

      }

    }

  } catch {

    errorMessage.value =
      'An error occurred during login.'

  } finally {

    isLoading.value = false

  }

}
</script>