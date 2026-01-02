<script setup lang="ts">
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'

const authService = useAuthServiceStore()
</script>

<template>
  <div class="h-dvh flex justify-center items-center">
    <div
      class="max-w-md font-bold p-10 bg-white ring-1 dark:ring-red-200 rounded-lg shadow-lg text-black mx-auto"
    >
      <h1 class="text-center">Ben Car Repair Shop</h1>

      <p class="mt-20 break-words">
        This is the home page of Ben Car repair shop. We specialize in all kinds of japanese and
        german cars. Please log in to enjoy our world class service.
      </p>

      <div v-if="!authService.isLoggedIn" class="flex justify-between items-center mt-10">
        <router-link to="/login" class="text-indigo-900 hover:text-green-900">Login</router-link>
        <router-link to="/signup" class="text-brown-900 hover:text-green-900">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>
