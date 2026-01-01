<script setup lang="ts">
import { ref } from 'vue'
import { Customer } from '@/models/customer.ts'
import { useCustomerDbStore } from '@/stores/customers/customer.db.ts'
import { useRouter } from 'vue-router'
import CustomerForm from '@/components/forms/customers/CustomerForm.vue'

const initialCustomerInfo = ref<Customer>(new Customer());
const formLabel = ref<string>("Create")

const customerDb = useCustomerDbStore();
const router = useRouter();

const  backButton = () => {
  router.push('/customers');
}

const resetButton = () => {
  initialCustomerInfo.value = new Customer();
}

const submitForm = async (customer: Customer) => {
  console.log("In add-customer, customer : ", customer);
  if (typeof customer.dateOfBirth === "string") {
    customer.dateOfBirth = new Date(customer.dateOfBirth);
  }
  await customerDb.createCustomer(customer);
  await router.push('/customers');
}
</script>

<template>
  <CustomerForm :form-label="formLabel" :initialCustomerInfo="initialCustomerInfo" @back="backButton" @reset="resetButton" @submit="submitForm($event)"/>
</template>

<style scoped></style>
