<script setup lang="ts"></script>

<template>
  <div class="relative group">
    <!-- Dropdown Trigger (e.g., a button or link) -->
    <button
      class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
    >
      Admin
    </button>
    <!--
    export const adminItems = [
      { href: '/customers', label: 'Customers' },
      { href: '/customers/all-active/get-all-active-customers', label: 'Active Customers' },
      { href: '/customers/all-in-active/get-all-in-active-customers', label: 'Inactive Customers' },
      { href: '/users', label: 'Users' },
      { href: '/tickets/completed-tickets', label: 'CompletedTickets' },
      { href: '/tickets/uncompleted-tickets', label: 'InCompletedTickets' },
      { href: '/tickets/by-customer', label: 'TicketsByCustomer' },
      { href: '/tickets', label: 'Tickets' },
    ];
    -->

    <!-- Dropdown Menu (hidden by default) -->
    <div
      class="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-b border-t-0 z-10"
    >
      <router-link to="/customers" class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Customers</router-link
      >
      <router-link
        to="/customers/all-active/get-all-active-customers"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Active Customers</router-link
      >
      <router-link
        to="/customers/all-in-active/get-all-in-active-customers"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Inactive Customers</router-link
      >
      <router-link to="/tickets" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Tickets</router-link>
      <router-link
        to="/tickets/completed-tickets"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Completed Tickets</router-link
      >
      <router-link
        to="/tickets/incomplete-tickets"
        class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
        >Incomplete Tickets</router-link
      >
      <router-link to="/users" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Users</router-link>
    </div>
  </div>
</template>
