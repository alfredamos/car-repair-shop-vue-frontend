<script setup lang="ts">
import CustomersTable from '@/components/customers/CustomersTable.vue';
import { useCustomerDbStore } from '@/stores/customers/customer.db.ts';
import { useCustomerServiceStore } from '@/stores/customers/customer.service.ts';
import { onMounted } from 'vue';

const customerDb = useCustomerDbStore();
const customerService = useCustomerServiceStore();

onMounted(() => {
  customerDb.getCustomers().then(() => {}).catch(console.error);
});


const makeActiveOrDeactivate = async (id: string) =>{
  await customerDb.changeCustomerStatus(id)
  customerDb.getCustomers().then(() => {}).catch(console.error);
}
</script>

<template>
  <CustomersTable :customers="customerService.customers" @onMakeActive="makeActiveOrDeactivate($event)" />
</template>
