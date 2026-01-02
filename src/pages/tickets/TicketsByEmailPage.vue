<script setup lang="ts">
import TicketsTable from '@/components/tickets/TicketsTable.vue'
import type { Ticket } from '@/models/ticket.ts'
import { computed, onMounted, ref } from 'vue'
import { useTicketDbStore } from '@/stores/tickets/ticket.db.ts'
import { useTicketServiceStore } from '@/stores/tickets/ticket.service.ts'
import { useRoute } from 'vue-router'

const tickets = ref<Ticket[]>([])

const ticketDb = useTicketDbStore()
const ticketService = useTicketServiceStore()

const route = useRoute()
const emailParam = route.params.emailParam as string
const email = computed(() => decodeURIComponent(emailParam as string))

onMounted(async () => {
  const fetchedCustomers = await loadTickets()
  console.log('Loaded tickets:', fetchedCustomers)
  tickets.value = { ...fetchedCustomers }
})

const jobCompleted = async (ticket: Ticket) => {
  await ticketDb.ticketJobCompleted(ticket.id)
  tickets.value = { ...(await loadTickets()) }
}

const loadTickets = async () => {
  const ticketsFromDb = await ticketDb.getTicketsByUserEmail(email.value)
  const ticketsFromStore = ticketService.tickets

  return ticketsFromStore ?? ticketsFromDb
}
</script>

<template>
  <TicketsTable :tickets="tickets" @onJobStatus="jobCompleted" />
</template>
