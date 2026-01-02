<script setup lang="ts">
import SettingsDropDown from '@/components/utils/SettingsDropDown.vue'
import AdminDropDown from '@/components/utils/AdminDropDown.vue'
import { useAuthDbStore } from '@/stores/auth/auth.db.ts'
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'

const authDbStore = useAuthDbStore()
const authServiceStore = useAuthServiceStore()

let isMenuOpen = false

const toggleMenu = () => {
  isMenuOpen = !isMenuOpen
}

const onLogout = async () => {
  await authDbStore.logoutUser()
}

const refreshUserToken = async () => {
  await authDbStore.refreshUserToken()
}
</script>

<template>
  <nav class="bg-gray-800 shadow-lg sticky top-0 bg-background z-10">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="text-white text-2xl font-bold">Logo</router-link>
        </div>

        <!-- Desktop Menu -->

        <div class="hidden md:flex md:gap-4 items-center space-x-1">
          <template v-if="authServiceStore.isLoggedIn">
            <AdminDropDown v-if="authServiceStore.isAdmin" />
            <SettingsDropDown @onRefreshUserToken="refreshUserToken" />
            <button
              @click="onLogout()"
              type="button"
              class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
            >
              Logout
            </button>
          </template>
          <!--          <a routerLink="/logout" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Logout</a>-->
          <template v-if="!authServiceStore.isLoggedIn">
            <router-link
              to="/login"
              class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >Login</router-link
            >
            <router-link
              to="/signup"
              class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
              >Signup</router-link
            >
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="toggleMenu()" class="mobile-menu-button">
            <svg
              class="w-6 h-6 text-gray-500 hover:text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu (toggled by JavaScript/TypeScript) -->
    <div class="md:hidden" :class="{'hidden': !isMenuOpen, 'block': isMenuOpen}">
      <router-link to="#" class="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        >Home</router-link
      >
      <router-link to="#" class="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        >Customers</router-link
      >
      <router-link to="#" class="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        >Tickets</router-link
      >
      <router-link to="#" class="block py-2 px-4 text-sm hover:bg-gray-700 text-white"
        >Users</router-link
      >
    </div>
  </nav>
</template>
