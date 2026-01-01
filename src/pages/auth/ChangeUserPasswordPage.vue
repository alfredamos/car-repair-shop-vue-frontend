<script setup lang="ts">
import ChangePasswordForm from '@/components/forms/auth/ChangePasswordForm.vue'
import { ChangeUserPasswordModel } from '@/models/auth/ChangeUserPasswordModel.ts'
import { useAuthDbStore } from '@/stores/auth/auth.db.ts'
import { useRouter } from 'vue-router'
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'
import { onMounted, ref } from 'vue'
import { User } from '@/models/auth/user.model.ts'

const changeUserPasswordForm = ref<ChangeUserPasswordModel>(new ChangeUserPasswordModel())
const authServiceStore = useAuthServiceStore()
const authDbStore = useAuthDbStore()

const user = ref<User>(new User())
const router = useRouter()

onMounted(async () => {
  const userData = await loadUser()
  user.value = { ...userData }

  changeUserPasswordForm.value = { ...fromChangeUserPasswordToUser(user.value) }
})

const loadUser = async () => {
  const userFromStore = authServiceStore.userCurrent
  const userFromDb = await authDbStore.getCurrentUser()

  return userFromDb ?? userFromStore
}

const submitForm = async (changeUserPassword: ChangeUserPasswordModel) => {
  console.log('Change-user-password-page, changeUserPassword: ', changeUserPassword)
  await authDbStore.changeUserPassword(changeUserPassword)

  await router.push('/')
}

const back = () => {
  router.back()
}

const fromChangeUserPasswordToUser = (user: User): ChangeUserPasswordModel => {
  return {
    email: user.email,
    password: '',
    newPassword: '',
    confirmPassword: '',
  }
}

</script>

<template>
  <ChangePasswordForm
    v-model:changeUserPassword="changeUserPasswordForm"
    @onSubmit="submitForm($event)"
    @onBack="back"
  />
</template>
