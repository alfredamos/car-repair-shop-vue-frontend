import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ticket } from '@/models/ticket.ts'
import { useTicketServiceStore } from '@/stores/tickets/ticket.service.ts'
import { Axios } from '@/db/axios.db.ts'

export const useTicketDbStore = defineStore('ticket-db', () => {
  const tickets = ref<Ticket[]>([]);
  const error = ref<unknown | null>(null);

  const ticketService = useTicketServiceStore();

  const getAllTickets = async () => {
    error.value = null;
    try {
      const response = await Axios.get<Ticket[]>(`/tickets`);
      console.log("In get-all-tickets, message, data : ", response.data)
      updateTickets(response.data);
      return response.data
    } catch (err: unknown) {
      console.error("In get-all-tickets, errorMessage : ", err);
      error.value = err;
      throw err;
    }
  }

  const getTicketById = async (id: string) => {
    error.value = null;
    try {
      const response = await Axios.get<Ticket>(`/tickets/${id}`);
      console.log("In get-ticket-by-id, message, data : ", response.data)
      return response.data
    } catch (err: unknown) {
      console.error("In get-ticket-by-id, errorMessage : ", err);
      error.value = err;
      throw err;
    }
  }

  const getCompletedTickets = async () => {
    error.value = null;
    try {
      const response = await Axios.get<Ticket[]>(`/tickets/all/get-all-complete-tickets`);
      console.log("In get-all-complete-tickets, message, data : ", response.data)
      updateTickets(response.data);
      return response.data
    } catch (err: unknown) {
      console.error("In get-all-complete-tickets, errorMessage : ", err);
      error.value = err;
      throw err;
    }


  }

  const getIncompleteTickets = async () => {
    error.value = null;
    try {
      const response = await Axios.get<Ticket[]>(`/tickets/all/get-all-incomplete-tickets`);
      console.log("In get-all-incomplete-tickets, message, data : ", response.data)
      updateTickets(response.data);
      return response.data
    } catch (err: unknown) {
      console.error("In get-all-incomplete-tickets, errorMessage : ", err);
      error.value = err;
      throw err;
    }
  }

  const getTicketsByUserEmail = async (email: string) => {
    error.value = null;
    try {
      const response = await Axios.get<Ticket[]>(`/tickets/get-tickets-by-user-email/${email}`);
      console.log("In get-tickets-by-email, message, data : ", response.data)
      updateTickets(response.data);
      return response.data
    } catch (err: unknown) {
      console.error("In get-tickets-by-email, errorMessage : ", err);
      error.value = err;
      throw err;
    }
  }

  const getTicketsByCustomerId = async (customerId: string) => {
    error.value = null;
    try {
      const response = await Axios.get<Ticket[]>(`/tickets/get-tickets-by-customer-id/${customerId}`);
      console.log("In get-tickets-by-customer-id, message, data : ", response.data)
      updateTickets(response.data);
      return response.data
    } catch (err: unknown) {
      console.error("In get-tickets-by-customer-id, errorMessage : ", err);
      error.value = err;
      throw err;
    }
  }

  const ticketJobCompleted = async (id: string) => {
    error.value = null;
    try {
      const response = await Axios.patch<Ticket>(`/tickets/change-status/${id}`);
      console.log("In ticket-job-completed, data : ", response.data)
      return response.data
    } catch (err: unknown) {
      console.error("In ticket-job-completed, errorMessage : ", err);
      error.value = err;
      throw err;
    }
  }

  const deleteTicketById = async (id: string)=> {
    error.value = null;
    try {
      const response = await Axios.delete<Ticket>(`/tickets/${id}`);
      console.log("In delete-ticket, message, data : ", response.data)
      const newTickets = ticketService.tickets?.filter(ticket => ticket.id !== response.data.id);
      updateTickets(newTickets);
    } catch (err: unknown) {
      console.error("In delete-ticket, errorMessage : ", err);
      error.value = err;
      throw err;
    }
  }

  const updateTickets = (newTickets: Ticket[])=> {
    tickets.value = [...newTickets];
    ticketService.updateTickets(newTickets);
    ticketService.setLocalStorage(newTickets);
  }

  const editTicketById = async (id: string, ticket: Ticket) => {
    error.value = null;
    try {
      const response = await Axios.patch<Ticket>(`/tickets/${id}`, ticket);
      console.log("In edit-ticket, message, data : ", response.data)
      const allTickets = ticketService.tickets;
      const newTickets = allTickets?.map(ticket => ticket.id === response.data.id ? response.data : ticket);
      updateTickets(newTickets);
    } catch (err: unknown) {
      console.error("In edit-ticket, errorMessage : ", err);
      error.value = err;
    }
  }

  const createTicket = async (ticket: Ticket) => {
    error.value = null;
    try {
      console.log("Create-ticket, customer : ", ticket);
      const response = await Axios.post<Ticket>(`/tickets`, ticket);
      console.log("In create-ticket, message, data : ", response.data)
      const newTickets = [...ticketService.tickets, response.data];
      updateTickets(newTickets);
    } catch (err: unknown) {
      console.error("In create-ticket, errorMessage : ", err);
      error.value = err;
      throw err;
    }

  }
  return {getAllTickets, getTicketsByUserEmail, getTicketsByCustomerId, getTicketById, ticketJobCompleted, deleteTicketById, editTicketById, createTicket, getCompletedTickets, getIncompleteTickets}
});
