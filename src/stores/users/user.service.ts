import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/models/auth/user.model.ts'
import { LocalStorageKey } from '@/models/LocalStorageKey.ts'

export const useUserServiceStore = defineStore('user-service', () => {
  const usersState = ref<User[]>([]);
  const users = computed(() => (usersState.value || getLocalStorage()));

  const updateUsers = (users: User[]) => {
    usersState.value = [...users];
  }

  const removeUsers = ()=> {
    usersState.value = [];
    removeStorage();
  }

  const findUserById = (id: string) => {
    return (usersState.value?.find(user => user.id === id) ?? getLocalStorage()?.find(user => user.id === id)) as User;
  }

  const setLocalStorage = (users: User[])=> {

    localStorage.setItem(LocalStorageKey.userKey, JSON.stringify(users));
  }

  const getLocalStorage = ()=> {
    return JSON.parse(localStorage.getItem(LocalStorageKey.userKey) as string) as User[] ?? [];
  }

  const removeStorage = ()=> {
    localStorage.removeItem(LocalStorageKey.userKey);
  }

  const findUserByEmail = (email: string) => {
    return (usersState.value?.find(user => user.email === email) ?? getLocalStorage()?.find(user => user.email === email)) as User;
  }

  return {users, updateUsers, setLocalStorage, findUserById, findUserByEmail}

})
