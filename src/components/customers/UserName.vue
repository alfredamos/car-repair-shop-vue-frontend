<script setup lang="ts">
import { User } from '@/models/auth/user.model.ts'
import { onMounted, ref } from 'vue'
import type { Ticket } from '@/models/ticket.ts'
import { useUserServiceStore } from '@/stores/users/user.service.ts'
import { useUserDbStore } from '@/stores/users/user.db.ts'

const props = defineProps<{
  id: string;

}>();

const user = ref<User>(new User())

const userDb = useUserDbStore();

const userService = useUserServiceStore();

onMounted(async () => {

  const oneUser = await userDb.getUserById(props.id);
  user.value = {...(userService.findUserById(props.id) ?? oneUser)}
})


</script>

<template>
  <td class="px-2 align-top">{{ user.name }}</td>
</template>
