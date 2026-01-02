<script setup lang="ts">
import { User } from '@/models/auth/user.model'

const props = defineProps<{
  users: User[]
}>()

const emit = defineEmits<{
  (e: 'onChangeRole', user: User): void
}>()

const encodedComponent = encodeURIComponent

const changeRole = (user: User) => {
  emit('onChangeRole', user)
}
</script>

<template>
  <template v-if="props.users.length === 0">
    <div class="flex justify-between items-center">
      <span class="font-bold">Add New User</span>
      <button
        class="flex-end px-4 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white rounded-lg"
      >
        <router-link to="/signup" class="font-bold">Add</router-link>
      </button>
    </div>
    <div class="h-dvh flex justify-center items-center">
      <h1 class="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">
        There are no users to display at this time!
      </h1>
    </div>
  </template>

  <div v-else class="overflow-x-auto overflow-y-auto mt-10 max-w-sm md:max-w-2xl mx-auto">
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <h4 class="text-center text-xl font-bold">List of Users</h4>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <div class="flex justify-between items-center">
      <span class="font-bold">Add New User</span>
      <button
        class="flex-end px-4 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white rounded-lg"
      >
        <router-link to="/signup" class="font-bold">Add</router-link>
      </button>
    </div>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <table class="mt-5">
      <thead>
        <tr>
          <th class="px-2 text-left">Image</th>
          <th class="px-2 text-left">name</th>
          <th class="px-2 text-left">Email</th>
          <th class="px-2 text-left">Phone</th>
          <th class="px-2 text-left">Role</th>
          <th class="px-2 text-left">Gender</th>
          <th class="px-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="m-1">
            <div class="relative w-full">
              <img :src="user.image" class="h-15 w-15 p-1 object-cover" :alt="user.name" />
            </div>
          </td>
          <td class="px-2 align-top">{{ user.name }}</td>
          <td class="px-2 align-top">{{ user.email }}</td>
          <td class="px-2 align-top">{{ user.phone }}</td>
          <td class="px-2 align-top">{{ user.role }}</td>
          <td class="px-2 align-top">{{ user.gender }}</td>
          <td class="flex items-center justify-center gap-2 px-2 align-middle">
            <router-link
              :to="`/users/${user.id}/detail`"
              class="px-2 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-bold rounded-md"
            >
              Detail
            </router-link>
            <router-link
              :to="`/users/${user.id}/detail`"
              class="px-2 py-1 bg-white text-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-bold rounded-md"
            >
              Delete
            </router-link>
            <button
              @click="changeRole(user)"
              class="flex items-center px-2 py-1 bg-white text-green-900 border border-green-900 hover:bg-green-900 hover:text-white font-bold rounded-md"
            >
              {{ user.role === 'Admin' ? 'User?' : 'Admin?' }}
            </button>
            <router-link
              :to="`/tickets/get-tickets-by-email/${encodedComponent(user.email)}`"
              class="flex items-center px-2 py-1 bg-white text-yellow-900 border border-yellow-900 hover:bg-yellow-900 hover:text-white font-bold rounded-md"
            >
              Tickets
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <hr class="h-px my-8 bg-gray-200 border-0" />
  </div>
</template>
