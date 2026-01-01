import { defineStore } from 'pinia'
import type { User } from '@/models/auth/user.model.ts'
import { ref } from 'vue'
import { ResponseMessage } from '@/models/ResponseMessage.ts'
import { useUserServiceStore } from '@/stores/users/user.service.ts'
import { Axios } from '@/db/axios.db.ts'

export const useUserDbStore = defineStore('user-db', () => {
  const users = ref<User[]>([]);
  const error = ref<unknown | null>(null);
  const message = ref<ResponseMessage>(new ResponseMessage())
  const userService = useUserServiceStore();

  const getUsers = async ()=> {
    error.value = null;
    try {
      const response = await Axios.get<User[]>("/users");
      console.log("In get-users, message, data : ", response.data)
      updateUsers(response.data);
    } catch (err: unknown) {
      console.error("In get-users, errorMessage : ", err);
      error.value = err;
    }
  }

  const deleteUserById = async (id: string) => {
    error.value = null;
    try {
      const response = await Axios.delete<User>(`/users/${id}`);
      console.log("In delete-user, message, data : ", response.data)
      const newUsers = userService.users?.filter(user => user.id !== response.data.id);
      updateUsers(newUsers);
    } catch (err: unknown) {
      console.error("In get-users, errorMessage : ", err);
      error.value = err;
    }
  }

  const getUserById = async (id: string) => {
    error.value = null;
    try {
      const response = await Axios.get<User>(`/users/${id}`);
      console.log("In get-customer-by-id, message, data : ", response.data)
      return response.data
    } catch (err: unknown) {
      console.error("In get-customer-by-id, errorMessage : ", err);
      error.value = err;
    }
  }

  const getUserByEmail = async (email: string)=> {
    error.value = null;
    try {
      const response = await Axios.get<User>(`/users/get-user-by-email/${email}`);
      console.log("In get-customer-by-email, message, data : ", response.data)
      return response.data
    } catch (err: unknown) {
      console.error("In get-customer-by-email, errorMessage : ", err);
      error.value = err;
    }
  }

 const updateUsers = (newUsers: User[])=> {
    users.value = [...newUsers];
    userService.updateUsers(newUsers);
    userService.setLocalStorage(newUsers);
  }

  return {getUserByEmail, getUsers, deleteUserById, getUserById}

});
