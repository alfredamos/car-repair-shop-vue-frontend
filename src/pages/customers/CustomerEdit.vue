<script setup lang="ts">
import CustomerForm from '@/components/forms/customers/CustomerForm.vue'
import { onMounted, ref } from 'vue'
import { Customer } from '@/models/customer.ts'
import { useCustomerDbStore } from '@/stores/customers/customer.db.ts'
import { useRoute, useRouter } from 'vue-router'
import { formattedDate, stringToDate } from '@/utils/formattedDate.ts'
import { useCustomerServiceStore } from '@/stores/customers/customer.service.ts'

const customerForm = ref<Customer>(new Customer())
const formLabel = ref<string>('Edit')

const customerDb = useCustomerDbStore()
const customerService = useCustomerServiceStore()
const router = useRouter()

const route = useRoute()
const id = route.params.id as string

onMounted(async () => {
  const oneCustomer = await loadCustomer()

  oneCustomer.dateOfBirth = formattedDate(stringToDate(oneCustomer.dateOfBirth))

  customerForm.value = { ...oneCustomer }
})



const loadCustomer = async () => {
  const oneCustomer = await customerDb.getCustomerById(id)

  return customerService.findCustomerById(id) ?? oneCustomer
}

const backButton = () => {
  router.push('/customers')
}

const resetButton = async () => {
  const initialValue = await loadCustomer()
  customerForm.value = { ...initialValue }
}

const submitForm = async (customer: Customer) => {
  console.log('In add-customer, customer : ', customer)
  if (typeof customer.dateOfBirth === 'string') {
    customer.dateOfBirth = new Date(customer.dateOfBirth)
  }
  await customerDb.editCustomerById(id, customer)
  await router.push('/customers')
}
</script>

<template>
  <CustomerForm
    :form-label="formLabel"
    v-model:customerForm="customerForm"
    @back="backButton"
    @reset="resetButton"
    @submit="submitForm($event)"
  />
</template>
