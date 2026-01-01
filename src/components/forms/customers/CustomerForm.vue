<script setup lang="ts">
import { defineModel } from 'vue'
import { Customer } from '@/models/customer.ts'

const props = defineProps<{
  formLabel: string
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'submit', customer: Customer): void
  (e: 'reset'): void
}>()


const customerForm = defineModel<Customer>('customerForm', { required: true })

const backButton = () => {
  emit('back')
}

const resetButton = () => {
  customerForm.value = { ...(customerForm.value) }
  emit('reset')
}

const submitForm = () => {
  emit('submit', customerForm.value)
}
</script>

<template>
  <form
    class="text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10 ring ring-gray-300"
  >
    <h4 class="font-bold text-slate-800 text-center text-xl mb-4 dark:text-white">
      {{ `${props.formLabel} Customer Form` }}
    </h4>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col md:flex-1">
        <div class="mb-3">
          <label for="email" class="text-base">Email</label>
          <input
            type="email"
            id="email"
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="customerForm.email"
          />
        </div>
        <div class="mb-3">
          <label for="name" class="text-base">Name</label>
          <input
            type="text"
            id="name"
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="customerForm.name"
          />
        </div>
        <div class="mb-3">
          <label for="dateOfBirth" class="text-base">Birthdate</label>
          <input
            type="date"
            id="dateOfBirth"
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="customerForm.dateOfBirth"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-1">
        <div class="mb-3">
          <label for="phone" class="text-base">Phone</label>
          <input
            type="tel"
            id="phone"
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="customerForm.phone"
          />
        </div>
        <div class="mb-3">
          <label for="address" class="text-base">Address</label>
          <input
            type="text"
            id="address"
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="customerForm.address"
          />
        </div>
        <div class="mb-3">
          <label for="image" class="text-base">Image</label>
          <input
            type="text"
            id="image"
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="customerForm.image"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 md:colospan-2">
      <div class="mb-3">
        <label for="gender" class="text-base">Gender</label>
        <select
          class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
          id="gender"
          v-model="customerForm.gender"
        >
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="notes" class="text-base">Notes</label>
        <textarea
          class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
          id="notes"
          v-model="customerForm.notes"
        ></textarea>
      </div>
    </div>
    <hr class="h-px my-8 bg-gray-200 border-0" />
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
