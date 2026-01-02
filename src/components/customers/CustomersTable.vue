<script setup lang="ts">
import type { Customer } from '@/models/customer.ts'
import UserName from '@/components/customers/UserName.vue'
import {formattedDate} from "@/utils/formattedDate";

const props = defineProps<{
  customers: Customer[]
}>()

const emit = defineEmits(['onMakeActive'])

const makeActive = async (id: string) => emit('onMakeActive', id)


const stringToDate = (date: string | Date) => {
  return typeof date === 'string' ? new Date(date) : date
}
</script>

<template>
  <template v-if="props.customers.length === 0">
    <div class="flex justify-between items-center">
      <span class="font-bold">Add New Customer</span>
      <button
        class="flex-end px-4 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white rounded-lg"
      >
        <router-link to="/customers/add" class="font-bold">Add</router-link>
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
    <h4 class="text-center text-xl font-bold">List of Customers</h4>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <div class="flex justify-between items-center">
      <span class="font-bold">Add New Customer</span>
      <button
        class="flex-end px-4 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white rounded-lg"
      >
        <router-link to="/customers/add" class="font-bold">Add</router-link>
      </button>
    </div>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <table class="mt-5">
      <thead>
        <tr>
          <th class="px-2 text-left">Image</th>
          <th class="px-2 text-left">Name</th>
          <th class="px-2 text-left">Email</th>
          <th class="px-2 text-left">Phone</th>
          <th class="px-2 text-left">Address</th>
          <th class="px-2 text-left">Gender</th>
          <th class="px-2 text-left">Birthdate</th>
          <th class="px-2 text-left">Status</th>
          <th class="px-2 text-left">Notes</th>
          <th class="px-2 text-left">User</th>
          <th class="px-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td class="p-2 align-top">
            <div class="relative w-full">
              <img :src="customer.image" class="h-15 w-15 p-1 object-cover" :alt="customer.name" />
            </div>
          </td>
          <td class="px-2 align-top">{{ customer.name }}</td>
          <td class="px-2 align-top">{{ customer.email }}</td>
          <td class="px-2 align-top">{{ customer.phone }}</td>
          <td class="px-2 align-top">{{ customer.address }}</td>
          <td class="px-2 align-top">{{ customer.gender }}</td>
          <td class="px-2 align-top">{{ formattedDate(stringToDate(customer.dateOfBirth)) }}</td>
          <td class="px-2 align-top">{{ customer.active ? 'Active' : 'Inactive' }}</td>
          <td class="px-2 align-top">{{ customer.notes }}</td>
          <td class="px-2 align-top">
            <UserName :id="customer.userId as string" />
          </td>
          <td class="flex items-center justify-center gap-2 px-2 align-middle">
            <router-link
              :to="`/customers/${customer.id}/detail`"
              class="px-2 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-bold rounded-md"
            >
              Detail
            </router-link>
            <router-link
              :to="`/customers/${customer.id as string}/edit`"
              class="px-2 py-1 bg-white text-yellow-900 border border-yellow-900 hover:bg-yellow-900 hover:text-white font-bold rounded-md"
            >
              Edit
            </router-link>
            <router-link
              :to="`/customers/${customer.id}/delete`"
              class="px-2 py-1 bg-white text-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-bold rounded-md"
            >
              Delete
            </router-link>
            <button
              @click="makeActive(customer.id as string)"
              class="flex items-center px-2 py-1 bg-white text-green-900 border border-green-900 hover:bg-green-900 hover:text-white font-bold rounded-md"
            >
              {{ customer.active ? 'Inactive?' : 'Active?' }}
            </button>
            <router-link
              :to="`/tickets/get-tickets-by-customer-id/${customer.id}`"
              class="flex items-center px-2 py-1 bg-white text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white font-bold rounded-md"
              >Tickets</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <hr class="h-px my-8 bg-gray-200 border-0" />
  </div>
</template>
