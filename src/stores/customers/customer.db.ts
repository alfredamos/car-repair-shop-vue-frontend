import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Customer } from '@/models/customer.ts'
import { useCustomerServiceStore } from '@/stores/customers/customer.service.ts'
import { Axios } from '@/db/axios.db.ts'

export const useCustomerDbStore = defineStore('customer-db', () => {
    const customers = ref<Customer[]>([]);
    const error = ref<unknown | null>(null);

    const customerService = useCustomerServiceStore();

    const getCustomers = async () => {
      error.value = null;
      try {
        const response = await Axios.get<Customer[]>("/customers");
        console.log("In get-users, message, data : ", response.data)
        updateCustomers(response.data);
      } catch (err: unknown) {
        console.error("In get-customers, errorMessage : ", err);
        error.value = err;
        throw err;
      }
    }

    const getAllActiveCustomers = async ()=> {
      error.value = null;
      try {
        const response = await Axios.get<Customer[]>("/customers/all-active/get-all-active-customers");
        console.log("In get-users, message, data : ", response.data)
        updateCustomers(response.data);
      } catch (err: unknown) {
        console.error("In get-customers, errorMessage : ", err);
        error.value = err;
        throw err;
      }
    }

    const getAllInActiveCustomers = async () => {
      error.value = null;
      try {
        const response = await Axios.get<Customer[]>("/customers/all-inactive/get-all-inactive-customers");
        console.log("In get-users, message, data : ", response.data)
        updateCustomers(response.data);
      } catch (err: unknown) {
        console.error("In get-customers, errorMessage : ", err);
        error.value = err;
        throw err;
      }
    }

    const getCustomerById = async (id: string) => {
      error.value = null;
      try {
        const response = await Axios.get<Customer>(`/customers/${id}`);
        console.log("In get-user-by-customer-id, message, data : ", response.data)
        return response.data
      } catch (err: unknown) {
        console.error("In get-user-by-customer-id, errorMessage : ", err);
        error.value = err;
        throw err;
      }
    }

    const changeCustomerStatus = async (id: string) => {
      error.value = null
      try {
        const response = await Axios.patch<Customer>(`/customers/change-status/${id}`)
        console.log('In make-active-de-active, data : ', response.data)
        return response.data
      } catch (err: unknown) {
        console.error('In make-active-de-active, errorMessage : ', err)
        error.value = err
        throw err
      }
    }

    const deleteCustomerById = async (id: string) => {
      error.value = null;
      try {
        const response = await Axios.delete<Customer>(`/customers/${id}`);
        console.log("In delete-customer, message, data : ", response.data)
        const newCustomers = customerService.customers?.filter(customer => customer.id !== response.data.id);
        updateCustomers(newCustomers);
      } catch (err: unknown) {
        console.error("In get-customer, errorMessage : ", err);
        error.value = err;
        throw err;
      }
    }

    const editCustomerById = async (id: string, customer: Customer) => {
      error.value = null;
      try {
        const response = await Axios.patch<Customer>(`/customers/${id}`, customer);
        console.log("In delete-customer, message, data : ", response.data)
        const newCustomers = customerService.customers?.map(customer => customer.id === response.data.id ? response.data : customer);
        updateCustomers(newCustomers);
      } catch (err: unknown) {
        console.error("In get-customer, errorMessage : ", err);
        error.value = err;
        throw err;
      }
    }

    const updateCustomers = (newCustomers: Customer[]) => {
      customers.value = [...newCustomers];
      customerService.updateCustomers(newCustomers);
      customerService.setLocalStorage(newCustomers);
    }

    const createCustomer = async (customer: Customer) => {
      error.value = null;
      try {
        console.log("CreateCustomer, customer : ", customer);
        const response = await Axios.post<Customer>(`/customers`, customer);
        console.log("In create-customer, message, data : ", response.data)
        const newCustomers = [...customerService.customers, response.data];
        updateCustomers(newCustomers);
      } catch (err: unknown) {
        console.error("In create-customer, errorMessage : ", err);
        error.value = err;
        throw err;
      }
    }

    return {getCustomers, getAllActiveCustomers, getAllInActiveCustomers, getCustomerById, changeCustomerStatus, deleteCustomerById, editCustomerById, createCustomer}
});
