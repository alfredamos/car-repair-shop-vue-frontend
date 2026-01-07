import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ticket } from '@/models/ticket.ts'
import { LocalStorageKey } from '@/models/LocalStorageKey.ts'

export const useTicketServiceStore = defineStore('ticket-service', () => {
  const ticketsState = ref<Ticket[]>([]);
  const tickets = computed(() => (ticketsState.value || getLocalStorage()));

  const updateTickets = (tickets: Ticket[]) => {
    ticketsState.value = [...tickets];
  }

  const removeTickets = ()=> {
    ticketsState.value = [];
    setLocalStorage([]);
    removeStorage();
  }

  const findTicketById = (id: string) => {
    return (ticketsState.value?.find(ticket => ticket.id === id) ?? getLocalStorage()?.find(ticket => ticket.id === id)) as Ticket;
  }

  const setLocalStorage = (tickets: Ticket[]) => {

    localStorage.setItem(LocalStorageKey.ticketKey, JSON.stringify(tickets));
  }

  const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem(LocalStorageKey.ticketKey) as string) as Ticket[] ?? [];
  }

  const removeStorage = () => {
    localStorage.removeItem(LocalStorageKey.ticketKey);
  }

  return {tickets, updateTickets, setLocalStorage, findTicketById, removeTickets}
});
