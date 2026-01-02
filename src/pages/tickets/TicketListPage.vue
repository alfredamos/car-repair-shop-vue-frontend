<script setup lang="ts">
import TicketsTable from '@/components/tickets/TicketsTable.vue'
import type { Ticket } from '@/models/ticket.ts'
import { onMounted, ref } from 'vue'
import { useTicketDbStore } from '@/stores/tickets/ticket.db.ts'
import { useTicketServiceStore } from '@/stores/tickets/ticket.service.ts'

const tickets = ref<Ticket[]>([])

const ticketDb = useTicketDbStore()
const ticketService = useTicketServiceStore()

onMounted(async () => {
  const fetchedCustomers = await loadTickets();
  console.log('Loaded tickets:', fetchedCustomers)
  tickets.value = { ...fetchedCustomers }
})

const jobCompleted = async (ticket: Ticket) => {
  await ticketDb.ticketJobCompleted(ticket.id)
  tickets.value = { ...(await loadTickets()) }
}

const loadTickets = async () => {
  const ticketsFromDb = await ticketDb.getAllTickets()
  const ticketsFromStore = ticketService.tickets

  return ticketsFromStore ?? ticketsFromDb
}
</script>

<template>
  <TicketsTable :tickets="tickets" @onJobStatus="jobCompleted" />
</template>
