<script setup lang="ts">
import UsersTable from '@/components/users/UsersTable.vue'
import { useAuthDbStore } from '@/stores/auth/auth.db.ts'
import { useUserDbStore } from '@/stores/users/user.db.ts'
import { onMounted } from 'vue'
import type { User } from '@/models/auth/user.model.ts'
import { Role } from '@/models/Role.ts'
import { useUserServiceStore } from '@/stores/users/user.service.ts'

const authDb = useAuthDbStore();
const userDb = useUserDbStore();
const userService = useUserServiceStore();

onMounted(() => {
  userDb.getUsers().then(() => {}).catch(console.error);
})


const  changeRole = async (user: User) => {
  await authDb.changeUserRole({email: user.email, role: user.role === Role.User ? Role.Admin : Role.User})
  userDb.getUsers().then(() => {}).catch(console.error);
}
</script>

<template>
  <UsersTable :users="userService.users" @onChangeRole="changeRole($event)" />
</template>

