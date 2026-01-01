<script setup lang="ts">
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'
import { computed } from 'vue'

const authServiceStore = useAuthServiceStore();

const email = computed(() =>  decodeURIComponent(authServiceStore.email))

const emit = defineEmits<{(e: 'onRefreshUserToken'): void }>()

const refreshUserToken = () => {
  emit('onRefreshUserToken');
}
</script>

<template>
  <div class="relative group">
    <!-- Dropdown Trigger (e.g., a button or link) -->
    <button
      class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
    >
      Settings
    </button>

    <!-- Dropdown Menu (hidden by default) -->
    <div
      class="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-b border-t-0 z-10"
    >
      <router-link to="/change-password" class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Change Password</router-link
      >
      <router-link to="/edit-profile" class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Edit profile</router-link
      >
      <router-link to="/" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</router-link>
      <button @click="refreshUserToken" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
        Refresh
      </button>
      <router-link
        :to="`/tickets/get-tickets-by-email/${email}`"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Tickets</router-link
      >
    </div>
  </div>
</template>
