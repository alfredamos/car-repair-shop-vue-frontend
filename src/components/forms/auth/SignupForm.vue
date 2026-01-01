<script setup lang="ts">
import { Gender } from '@/models/Gender.ts'
import { ref } from 'vue'

const signupUserForm = ref({
  name: '',
  phone: '',
  password: '',
  email: '',
  image: '',
  confirmPassword: '',
  gender: Gender.Male,
});

const emit = defineEmits(['onSubmit', 'onBack']);

const submit = () => {
  emit('onSubmit', signupUserForm.value)
}

const back = () => {
  emit('onBack')
}
</script>

<template>
  <form class="max-w-sm shadow-2xl px-10 py-8 mx-auto rounded-lg mt-20 ring ring-gray-300">
    <h4 class="text-center text-xl font-bold mb-4">Signup User Form</h4>
    <div class="flex flex-col md:flex-row md:gap-2">
      <div class="flex flex-col md:flex-1">
        <div class="flex flex-col mb-3">
          <label for="name" class="text-base">Name</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="text"
            id="name"
            v-model="signupUserForm.name"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="phone" class="text-base">Phone</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="tel"
            id="phone"
            v-model="signupUserForm.phone"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="password" class="text-base">Password</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="password"
            id="password"
            v-model="signupUserForm.password"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-1">
        <div class="flex-col mb-3">
          <label for="email" class="text-base">Email</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="email"
            id="email"
            v-model="signupUserForm.email"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="image" class="text-base">Image</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="text"
            id="Image"
            v-model="signupUserForm.image"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="confirmPassword" class="text-base">Confirm Password</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="password"
            id="confirmPassword"
            v-model="signupUserForm.confirmPassword"
          />
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="gender" class="text-base">Gender</label>
      <select
        class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
        v-model="signupUserForm.gender"
      >
        <option></option>
        <option :value="Gender.Male">Male</option>
        <option :value="Gender.Female">Female</option>
      </select>
    </div>
    <div class="flex flex-col md:flex-row items-center md:justify-between mt-6 md:gap-2">
      <button
        type="button"
        class="py-2 px-4 border-2 border-indigo-900 hover:bg-indigo-900 hover:text-white text-indigo-900 font-bold rounded-lg w-full md:w-1/2 mb-2"
        @click="submit"
      >
        Save
      </button>
      <button
        type="button"
        class="py-2 border-2 border-yellow-900 px-4 hover:bg-yellow-900 hover:text-white text-yellow-900 font-bold rounded-lg w-full md:w-1/2 mb-2"
        @click="back"
      >
        Back
      </button>
    </div>
  </form>
</template>

