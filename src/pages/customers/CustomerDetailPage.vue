<script setup lang="ts">
import ModalDialog from '@/utils/ModalDialog.vue';
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Customer } from '@/models/customer.ts'
import { useCustomerDbStore } from '@/stores/customers/customer.db.ts'
import { useCustomerServiceStore } from '@/stores/customers/customer.service.ts'
import { formattedDate, stringToDate } from '@/utils/formattedDate.ts'

const route = useRoute();
const id = route.params.id as string;
const isModalOpen = ref(false);

const customer = ref<Customer>(new Customer())

const customerDb = useCustomerDbStore();
const customerService = useCustomerServiceStore();

const router = useRouter();

onMounted(async () => {
  const oneCustomer = await loadCustomer();
  oneCustomer.dateOfBirth = formattedDate(stringToDate(oneCustomer.dateOfBirth))

  customer.value = {...oneCustomer}
})


const loadCustomer = async () => {
  const oneCustomer = await customerDb.getCustomerById(id);

  return customerService.findCustomerById(id) ?? oneCustomer;
}
const openModal = () => {
  isModalOpen.value = true;
}

const onModalClose = () => {
  isModalOpen.value = false;
  console.log('Modal closed');
}

const deleteCustomer = async () => {
  await customerDb.deleteCustomerById(id)
  await router.push('/customers');
}
</script>

<template>
  <div
    class="flex flex-col max-w-xs sm:max-w-sm md:max-w-md mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-2xl"
  >
    <div class="w-full h-auto">
      <img :src="customer.image" :alt="customer.name" sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <div class="flex-1">
      <div>
        <p class="text-sm font-bold mt-2 mb-2 flex items-center justify-between">
          <span>Name</span>
          <span class="text-start">{{ customer.name }}</span>
        </p>
        <p class="text-sm mt-2 mb-2 flex items-center justify-between">
          <span>Email</span>
          <span class="text-start">{{ customer.email }}</span>
        </p>
        <p class="text-sm mt-2 mb-2 flex items-center justify-between">
          <span>Phone</span>
          <span class="text-start">{{ customer.phone }}</span>
        </p>
        <p class="text-sm mt-2 mb-2 flex items-center justify-between">
          <span>Gender</span>
          <span class="text-start">{{ customer.gender }}</span>
        </p>
        <p class="text-sm mt-2 mb-2 flex items-center justify-between">
          <span>BirthDate</span>
          <span class="text-start">{{ customer.dateOfBirth }}</span>
        </p>
        <p class="flex flex-col mt-2 mb-2">
          <span class="text-sm">Notes</span>
          <span class="break-words">{{ customer.notes }}</span>
        </p>
      </div>
      <hr class="h-px my-4 bg-gray-200 border-0" />
      <div class="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
        <router-link
          to="/customers"
          class="px-2 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-bold w-full md:w-1/3 text-center rounded-md"
          >Back</router-link
        >
        <button
          @click="openModal()"
          class="px-2 py-1 bg-white text-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-bold w-full md:w-1/3 text-center rounded-md"
        >
          Delete
        </button>
        <router-link
          :to="`/customers/${customer.id}/edit`"
          class="px-2 py-1 bg-white text-yellow-900 border border-yellow-900 hover:bg-yellow-900 hover:text-white font-bold w-full md:w-1/3 text-center rounded-md"
          >Edit</router-link
        >
      </div>
    </div>
  </div>

  <ModalDialog :isOpen="isModalOpen" @onCloseModal="onModalClose()">
    <!-- Content passed into the modal's ng-content -->
    <p class="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
      Do you really want to delete {{ customer.name }}?
    </p>
    <button
      @click="deleteCustomer()"
      class="mt-4 px-4 py-2 border border-rose-900 bg-rose-900 text-white hover:bg-white hover:text-rose-900 font-bold rounded"
    >
      Confirm
    </button>
  </ModalDialog>
</template>

<style scoped></style>
