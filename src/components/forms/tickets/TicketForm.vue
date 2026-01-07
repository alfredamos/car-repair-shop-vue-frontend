<script setup lang="ts">
import { Ticket } from '@/models/ticket.ts'
import type { Customer } from '@/models/customer.ts'
import type { User } from '@/models/auth/user.model.ts'

const props = defineProps<{
  customers: Customer[]
  formLabel: string
  users: User[]
}>()

const emits = defineEmits<{ (e: 'onSubmit', ticket: Ticket): void; (e: 'onBack'): void; (e: 'onReset'): void }>()

const ticketForm = defineModel<Ticket>('ticketForm', { required: true })

const submitForm = () => emits('onSubmit', ticketForm.value)

const backButton = () => emits('onBack');

const resetButton = () => emits('onReset')

</script>

<template>
  <form
    class="text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl ring-gray-300 py-6 px-10 mt-10"
  >
    <h4 class="font-bold text-slate-800 text-center text-xl mb-4 dark:text-white">
      {{ `${props.formLabel} Ticket Form` }}
    </h4>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col md:flex-1">
        <div class="mb-3">
          <label for="title" class="text-base">Title</label>
          <input
            type="text"
            id="title"
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="ticketForm.title"
          />
        </div>
        <div class="mb-3">
          <label for="tech" class="text-base">Tech</label>
          <select
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            id="tech"
            v-model="ticketForm.tech"
          >
            <option>Select technician</option>
            <option v-for="user in props.users" :key="user.id" :value="user.email">
              {{ user.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="customerId" class="text-base">Customer</label>
          <select
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            id="customerId"
            v-model="ticketForm.customerId"
          >
            <option>Select customer</option>
            <option v-for="customer in props.customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="notes" class="text-base">Notes</label>
          <textarea
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            id="notes"
            v-model="ticketForm.notes"
          ></textarea>
        </div>
        <div class="mb-3 flex items-center justify-between w-full gap-2">
          <label for="completed" class="text-base w-1/3 mt-2">Completed</label>
          <div class="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="completed"
              class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
              v-model="ticketForm.completed"
            />
            <span>Yes</span>
          </div>
        </div>
      </div>
    </div>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <div class="flex flex-col md:flex-row items-center md:justify-between mt-6 gap-2">
      <button
        type="button"
        class="py-2 border-2 border-yellow-900 px-4 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold rounded-lg w-full md:w-1/3 mb-4"
        @click="backButton()"
      >
        Back
      </button>
      <button
        type="button"
        class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold rounded-lg w-full md:w-1/3 mb-4"
        @click="submitForm()"
      >
        Save
      </button>
      <button
        type="button"
        class="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-white text-rose-900 font-bold rounded-lg w-full md:w-1/3 mb-4"
        @click="resetButton()"
      >
        Reset
      </button>
    </div>
  </form>
</template>
