<script setup lang="ts">
import LoginForm from '@/components/forms/auth/LoginForm.vue'
import type { LoginUser } from '@/models/auth/LoginUser.ts'
import { useAuthDbStore } from '@/stores/auth/auth.db.ts'
import { useRouter } from 'vue-router'

const authDb = useAuthDbStore();
const router = useRouter();
const submitForm = async (loginUser: LoginUser) => {
  console.log('Form submitted with data:', loginUser)
  await authDb.loginUser(loginUser);

  await router.push("/")

}

const backToList = () => {
  console.log('Going back to list');
  router.back();
}
</script>

<template>
  <LoginForm @onSubmit="submitForm($event)" @onBack="backToList" />
</template>


