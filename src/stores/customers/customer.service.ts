import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Customer } from '@/models/customer.ts'
import { LocalStorageKey } from '@/models/LocalStorageKey.ts'

export const useCustomerServiceStore = defineStore('customer-service', () => {
  const customersState = ref<Customer[]>([]);
  const customers = computed(() => (customersState.value || getLocalStorage()));

  const updateCustomers = (customers: Customer[]) => {
    customersState.value = [...customers];
  }

  const removeCustomers = ()=>{
    customersState.value= [];
    removeStorage();
  }

  const findCustomerById = (id: string) => {
    return (customersState.value?.find(customer => customer.id === id) ?? getLocalStorage()?.find(customer => customer.id === id)) as Customer;
  }

  const setLocalStorage = (customers: Customer[]) => {
    localStorage.setItem(LocalStorageKey.customerKey, JSON.stringify(customers));
  }

  const getLocalStorage = () => {
    return JSON.parse(localStorage.getItem(LocalStorageKey.customerKey) as string) as Customer[] ?? [];
  }

  const removeStorage = () => {
    localStorage.removeItem(LocalStorageKey.customerKey);
  }

  return {customers, updateCustomers, setLocalStorage, findCustomerById}
});
