<script setup lang="ts">
import SignupForm from '@/components/forms/auth/SignupForm.vue'
import { useAuthDbStore } from '@/stores/auth/auth.db.ts'
import { useRouter } from 'vue-router'
import type { SignupUserModel } from '@/models/auth/SignupUserModel.ts'

const authDbStore = useAuthDbStore();
const router = useRouter();

const submitForm = async (signupUserForm: SignupUserModel) => {
  await authDbStore.signupUser(signupUserForm);
  await router.push("/");
}

const back = () => {
  router.back();
}

</script>

<template>
  <SignupForm @onSubmit="submitForm($event)" @onBack="back"/>
</template>

