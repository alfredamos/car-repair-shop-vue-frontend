<script setup lang="ts">
import TicketForm from '@/components/forms/tickets/TicketForm.vue'
import { useCustomerDbStore } from '@/stores/customers/customer.db.ts'
import { useCustomerServiceStore } from '@/stores/customers/customer.service.ts'
import { useUserDbStore } from '@/stores/users/user.db.ts'
import { useUserServiceStore } from '@/stores/users/user.service.ts'
import { Ticket } from '@/models/ticket.ts'
import { onMounted, ref } from 'vue'
import type { Customer } from '@/models/customer.ts'
import type { User } from '@/models/auth/user.model.ts'
import { useTicketDbStore } from '@/stores/tickets/ticket.db.ts'
import { useRoute, useRouter } from 'vue-router'
import { useTicketServiceStore } from '@/stores/tickets/ticket.service.ts'

const customers = ref<Customer[]>([]);
const ticketForm = ref<Ticket>(new Ticket());
const users = ref<User[]>([]);

const customerDb = useCustomerDbStore();
const customerService = useCustomerServiceStore();

const route = useRoute();
const id = route.params.id as string;

const router = useRouter();

const ticketDb = useTicketDbStore();
const ticketService = useTicketServiceStore();

const userDb = useUserDbStore();
const userService = useUserServiceStore();

onMounted(async () => {
  const [fetchedCustomers, fetchedTicket, fetchedUsers] = await Promise.all([loadCustomers(), loadTicket(), loadUsers()]);
  customers.value = [...fetchedCustomers ];
  ticketForm.value = fetchedTicket ?? ticketForm.value;
  users.value = [...fetchedUsers ];
})

const loadCustomers = async () => {
  const customersFromDb = await customerDb.getCustomers()
  const customersFromStore = customerService.customers

  return customersFromStore ?? customersFromDb
}

const loadTicket = async () => {
  const ticketFromDb = await ticketDb.getTicketById(id);
  const ticketFromStore = ticketService.findTicketById(id);

  ticketForm.value = ticketFromStore ?? ticketFromDb;
}

const loadUsers = async () => {
  const usersFromDb = await userDb.getUsers()
  const usersFromStore = userService.users

  return usersFromStore ?? usersFromDb
}

const submitForm = async (ticket: Ticket) => {
  console.log('In edit-ticket-form, ticket : ', ticket)
  await ticketDb.editTicketById(id, ticket)

  await router.push('/tickets')
}

const back = () => {
  router.push('/tickets')
}
</script>

<template>
  <TicketForm
    v-model:ticketForm="ticketForm"
    formLabel="Create"
    :customers="customers"
    :users="users"
    @onSubmit="submitForm($event)"
    @onBack="back"
  />
</template>
