<script setup lang="ts">
import CustomerName from '@/components/forms/customers/CustomerName.vue'
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'
import type { Ticket } from '@/models/ticket.ts'

const props = defineProps<{
  tickets: Ticket[]
}>();

const emit = defineEmits<{
  (e: 'onJobStatus', ticket: Ticket): void
}>();

const authService = useAuthServiceStore();

const jobCompleted = (ticket: Ticket) =>{
  emit('onJobStatus', ticket);
}
</script>

<template>
  <template v-if="props.tickets.length === 0">
    <div class="flex justify-between items-center mt-5 mx-20">
      <span class="font-bold">Add New Ticket</span>
      <router-link
        class="flex-end px-4 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-bold rounded-lg"
        to="/tickets/add"
        >Add</router-link
      >
    </div>
    <div class="h-dvh flex justify-center items-center">
      <h1 class="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">
        There are no tickets to display at this time!
      </h1>
    </div>
  </template>
  <div v-else class="overflow-x-auto overflow-y-auto mt-5 max-w-sm md:max-w-2xl mx-auto">
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <h4 class="text-center text-xl font-bold">List of Tickets</h4>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <div v-if="authService.isAdmin" class="flex justify-between items-center">
      <span class="font-bold">Add New Ticket</span>
      <router-link
        class="flex-end px-4 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-bold rounded-lg"
        to="/tickets/add"
        >Add</router-link
      >
    </div>
    <hr class="h-px my-4 bg-gray-200 border-0" />

    <table class="mt-5 table-fixed">
      <thead>
        <tr>
          <th class="px-2 text-left w-1/6">Title</th>
          <th class="px-2 text-left">Notes</th>
          <th class="px-2 text-left">Completed</th>
          <th class="px-2 text-left">Assignee</th>
          <th class="px-2 text-left">Customer</th>
          <th class="px-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in tickets" :key="ticket.id">
          <td class="px-2 align-top w-1/6">{{ ticket.title }}</td>
          <td class="px-2 align-top">{{ ticket.notes }}</td>
          <td class="px-2 align-top">{{ ticket.completed ? 'Yes' : 'Not yet' }}</td>
          <td class="px-2 align-top">{{ ticket.tech }}</td>
          <td class="px-2 align-top">
            <CustomerName :ticket="ticket" />
          </td>

          <td class="flex items-center justify-center gap-2 px-2 align-middle">
            <template v-if="authService.isAdmin">
              <router-link
                :to="`/tickets/${ticket.id}/edit`"
                class="px-2 py-1 bg-white text-yellow-900 border border-yellow-900 hover:bg-yellow-900 hover:text-white font-bold rounded-md"
              >
                Edit
              </router-link>
              <router-link
                :to="`/tickets/${ticket.id}/delete`"
                class="px-2 py-1 bg-white text-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-bold rounded-md"
              >
                Delete
              </router-link>
            </template>
            <router-link
              :to="`/tickets/${ticket.id}/detail`"
              class="px-2 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-bold rounded-md"
            >
              Detail
            </router-link>
            <button
              @click="jobCompleted(ticket)"
              class="flex items-center px-2 py-1 bg-white text-green-900 border border-green-900 hover:bg-green-900 hover:text-white font-bold rounded-md"
            >
              {{ ticket.completed ? 'Undo' : 'Done' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <hr class="h-px my-8 bg-gray-200 border-0" />
  </div>
</template>
