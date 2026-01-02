<script setup lang="ts">
  import {Gender} from '@/models/Gender.ts';
  import type { EditUserProfileModel } from '@/models/auth/EditUserProfileModel.ts'

  const editUserProfileForm = defineModel<EditUserProfileModel>('editUserProfileForm', { required: true });
  const emit = defineEmits(['submit', 'back']);

  const submit = () => {
    emit('submit', editUserProfileForm.value);
  };

  const back = () => {
    emit('back');
  };

</script>

<template>
  <form class="max-w-sm shadow-2xl px-10 py-8 mx-auto rounded-lg mt-20 ring ring-gray-300">
    <h4 class="text-center text-xl font-bold mb-4">Edit User Profile Form</h4>
    <div class="flex flex-col md:flex-row md:gap-2">
      <div class="flex flex-col md:flex-1">
        <div class="flex flex-col mb-3">
          <label for="name" class="text-base">Name</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="text"
            id="name"
            v-model="editUserProfileForm.name"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="phone" class="text-base">Phone</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="tel"
            id="phone"
            v-model="editUserProfileForm.phone"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="password" class="text-base">Password</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="password"
            id="password"
            v-model="editUserProfileForm.password"
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
            v-model="editUserProfileForm.email"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="image" class="text-base">Image</label>
          <input
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            type="text"
            id="Image"
            v-model="editUserProfileForm.image"
          />
        </div>
        <div class="flex-col mb-3">
          <label for="gender" class="text-base">Gender</label>
          <select
            class="w-full max-w-xs ring-1 ring-gray-300 rounded-md"
            v-model="editUserProfileForm.gender"
          >
            <option>Select Gender</option>
            <option :value="Gender.Male">{{ Gender.Male }}</option>
            <option :value="Gender.Female">{{ Gender.Female }}</option>
          </select>
        </div>
      </div>
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

