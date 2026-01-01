<script setup lang="ts">
import EditProfileForm from '@/components/forms/auth/EditProfileForm.vue'
import { EditUserProfileModel } from '@/models/auth/EditUserProfileModel.ts'
import { useAuthDbStore } from '@/stores/auth/auth.db.ts'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { User } from '@/models/auth/user.model.ts'
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'

const authService = useAuthServiceStore()
const authDb = useAuthDbStore()

const user = ref<User>(new User())
const editUserProfileForm = ref<EditUserProfileModel>(new EditUserProfileModel())
const authDbStore = useAuthDbStore()
const router = useRouter()

onMounted(async () => {
  const userData = await loadUser()
  user.value = { ...userData }
  editUserProfileForm.value = { ...fromUserToEditProfileForm(user.value) }
})


const loadUser = async () => {
  const userFromStore = authService.userCurrent
  const userFromDb = await authDb.getCurrentUser()

  return userFromDb ?? userFromStore
}

const fromUserToEditProfileForm = (user: User): EditUserProfileModel => {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: '',
    gender: user.gender,
    image: user.image,
  }
}

const submitForm = async (editProfileUser: EditUserProfileModel) => {
  console.log('Edit-user-profile-page, editProfileUser: ', editProfileUser)
  await authDbStore.editProfileUser(editProfileUser)

  await router.push('/')
}

const back = () => {
  router.back()
}
</script>

<template>
  <EditProfileForm
    v-model:editUserProfileForm="editUserProfileForm"
    @submit="submitForm($event)"
    @back="back"
  />
</template>
