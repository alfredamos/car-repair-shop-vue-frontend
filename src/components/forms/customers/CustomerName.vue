<script setup lang="ts">

 import { onMounted, ref } from 'vue'
 import { Customer } from '@/models/customer.ts'
 import { Ticket } from '@/models/ticket.ts'
 import { useCustomerDbStore } from '@/stores/customers/customer.db.ts'
 import { useCustomerServiceStore } from '@/stores/customers/customer.service.ts'

 const props = defineProps<{
   ticket: Ticket
 }>()

  const customer = ref<Customer>(new Customer())

  const customerDb = useCustomerDbStore();
  const customerService = useCustomerServiceStore();

  onMounted(async () => {
    const customerId = props.ticket?.customerId as string
    if (!customerId) return;
    const oneCustomer = await customerDb.getCustomerById(customerId)
    customer.value = {...(customerService.findCustomerById(customerId) ?? oneCustomer)}
  })
</script>

<template>
  <td class="px-2 align-top">{{ customer.name }}</td>
</template>
