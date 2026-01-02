<script setup lang="ts">
import ModalDialog from '@/utils/ModalDialog.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'
import { useCustomerDbStore } from '@/stores/customers/customer.db.ts'
import { useCustomerServiceStore } from '@/stores/customers/customer.service.ts'
import { useTicketDbStore } from '@/stores/tickets/ticket.db.ts'
import { useTicketServiceStore } from '@/stores/tickets/ticket.service.ts'
import { useUserDbStore } from '@/stores/users/user.db.ts'
import { useUserServiceStore } from '@/stores/users/user.service'
import { Ticket } from '@/models/ticket.ts'
import { Customer } from '@/models/customer.ts'
import { User } from '@/models/auth/user.model.ts'

const route = useRoute()
const id = route.params.id as string

const isModalOpen = ref(false)

const authService = useAuthServiceStore()
const router = useRouter()

const customerDb = useCustomerDbStore()
const customerService = useCustomerServiceStore()

const ticketDb = useTicketDbStore()
const ticketService = useTicketServiceStore()

const userDb = useUserDbStore()
const userService = useUserServiceStore()

const ticket = ref<Ticket>(new Ticket())

const customer = ref<Customer>(new Customer())

const user = ref<User>(new User())

onMounted(async () => {
  const ticketData = await computeTicket()
  const [customerData, userData] = await Promise.all([
    computeCustomer(ticketData),
    computeUser(ticketData),
  ])

  customer.value = { ...customerData }
  ticket.value = { ...ticketData }
  user.value = { ...userData }
})

const computeTicket = async () => {
  return ticketService.findTicketById(id) ?? (await ticketDb.getTicketById(id))
}

const computeCustomer = async (ticket: Ticket) => {
  return (
    customerService.findCustomerById(ticket.customerId) ??
    (await customerDb.getCustomerById(ticket.customerId))
  )
}

const computeUser = async (ticket: Ticket) => {
  return userService.findUserById(ticket.tech) ?? (await userDb.getUserByEmail(ticket.tech))
}

const openModal = () => (isModalOpen.value = true)

const onModalClose = () => {
  isModalOpen.value = false
  console.log('Modal closed')
}

const deleteTicket = async () => {
  await ticketDb.deleteTicketById(id)
  await router.push(
    `${authService.isAdmin ? '/tickets' : `/tickets/get-tickets-by-email/${ticket.value.tech}`}`,
  )
}
</script>

<template>
  <div
    class="flex flex-col max-w-sm mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-xl"
  >
    <div class="flex items-center justify-between">
      <div class="flex-col items-center">
        <p class="text-sm text-start font-bold">Customer</p>
        <div class="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
          <img :src="customer.image" :alt="customer.name" class="rounded-full h-15 w-15" />
          <p class="text-sm">{{ customer.name }}</p>
        </div>
      </div>
      <div class="flex-col items-center">
        <p class="text-sm text-start font-bold">Technician</p>
        <div class="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
          <img :src="user.image" :alt="user.name" class="rounded-full h-15 w-15" />
          <p class="text-sm">{{ user.name }}</p>
        </div>
      </div>
    </div>
    <hr class="h-px my-4 bg-gray-200 border-0" />
    <div class="w-full">
      <div class="">
        <p class="text-sm mt-2 mb-2 flex items-center justify-between">
          <span>Title</span>
          <span class="text-start">{{ ticket.title }}</span>
        </p>
        <p class="text-sm mt-2 mb-2 flex items-center justify-between">
          <span>Completed</span>
          <span class="text-start">{{ ticket.completed ? 'Completed' : 'Incomplete' }}</span>
        </p>

        <p class="flex flex-col mt-2 mb-2">
          <span class="text-sm">Notes</span>
          <span class="break-words">{{ ticket.notes }}</span>
        </p>
      </div>
      <hr class="h-px my-4 bg-gray-200 border-0" />
      <div class="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
        <router-link
          :to="`${authService.isAdmin ? '/tickets' : `/tickets/get-tickets-by-email/${user.email}`}`"
          :class="{ 'md:w-full': !authService.isAdmin }"
          class="px-2 py-1 bg-white text-indigo-900 border border-indigo-900 hover:bg-indigo-900 hover:text-white font-bold w-full md:w-1/3 text-center rounded-md"
          >Back</router-link
        >
        <template v-if="authService.isAdmin">
          <button
            @click="openModal()"
            class="px-2 py-1 bg-white text-rose-900 border border-rose-900 hover:bg-rose-900 hover:text-white font-bold w-full md:w-1/3 text-center rounded-md"
          >
            Delete
          </button>
          <router-link
            :to="`/tickets/${ticket.id}/edit`"
            class="px-2 py-1 bg-white text-yellow-900 border border-yellow-900 hover:bg-yellow-900 hover:text-white font-bold w-full md:w-1/3 text-center rounded-md"
            >Edit</router-link
          >
        </template>
      </div>
    </div>
  </div>

  <ModalDialog :isOpen="isModalOpen" @onCloseModal="onModalClose()">
    <!-- Content passed into the modal's ng-content -->
    <p class="text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
      Do you really want to delete {{ ticket.title }}?
    </p>
    <button
      @click="deleteTicket()"
      class="mt-4 px-4 py-2 border border-rose-900 bg-rose-900 text-white hover:bg-white hover:text-rose-900 font-bold rounded"
    >
      Confirm
    </button>
  </ModalDialog>
</template>
