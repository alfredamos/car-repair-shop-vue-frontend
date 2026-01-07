import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Axios } from '@/db/axios.db.ts'
import { User } from '@/models/auth/user.model.ts'
import { UserSession } from '@/models/auth/UserSession.ts'
import type { ChangeUserPasswordModel } from '@/models/auth/ChangeUserPasswordModel.ts'
import type { ChangeUserRole } from '@/models/auth/ChangeUserRole.ts'
import type { EditUserProfileModel } from '@/models/auth/EditUserProfileModel.ts'
import type { LoginUserModel } from '@/models/auth/LoginUserModel.ts'
import type { SignupUserModel } from '@/models/auth/SignupUserModel.ts'
import { ResponseMessage } from '@/models/ResponseMessage.ts'
import { useAuthServiceStore } from '@/stores/auth/auth.service.ts'


export const useAuthDbStore = defineStore('auth-db', () => {
  const userSession = ref(new UserSession());
  const user = ref(new User());
  const message = ref(new ResponseMessage());
  const error = ref<unknown | null>(null)

  const authService = useAuthServiceStore();

  async function changeUserPassword(changeUserPasswordModel: ChangeUserPasswordModel){
    try {
      const response = await Axios.patch<ResponseMessage>("/auth/change-password", changeUserPasswordModel);
      console.log("In change-password, data : ", response.data);
      updateMessage(response.data);
      return response.data;
    } catch (err: unknown) {
      error.value = err;
      console.error("Change-password-db, errorMessage : ", err);
    }
  }

  async function changeUserRole(changeRoleOfUser: ChangeUserRole){
    try {
      const response = await Axios.patch<ResponseMessage>("/auth/change-role", changeRoleOfUser);
      console.log("In change-user-role, data : ", response.data)
      updateMessage(response.data)
      return response.data;
    } catch (err: unknown) {
      error.value = err;
      console.error("In change-user-role, errMessage : ", err);
    }
  }

  async function editProfileUser(editUserProfileModel: EditUserProfileModel){
    try {
      const response = await Axios.patch<ResponseMessage>("/auth/edit-profile", editUserProfileModel);
      console.log("In edit-user-profile, data : ", response.data)
      updateMessage(response.data);
      return response.data;
    } catch (err: unknown) {
      error.value = err;
      console.error("In edit-user-profile, errMessage : ", err);
    }
  }

  async function loginUser(loginUser: LoginUserModel){
    try {
      const response = await Axios.post<UserSession>("/auth/login", loginUser);
      console.log("In login-user-db, session : ", response?.data)
      updateSession(response.data);
      return response.data;
    } catch (err: unknown) {
      error.value = err;
      console.error("In login-user-db, errMessage : ", err);
    }

  }

  async function logoutUser(){
    try {
      console.log("Logged out");
      const response = await Axios.post<UserSession>("/auth/logout");
      console.log("In login-user-db, session : ", response?.data)
      updateSession(response.data);
      removeStoresAndLocalStorages();
      return response.data
    } catch (err: unknown) {
      error.value = err;
      console.log("In login-user-db, errMessage : ", err);
    }

  }

  async function getCurrentUser(){
    try {
      const response = await Axios.get<User>("/auth/me");
      console.log("In get-current-user, data : ", response.data)
      updateUser(response.data);
      return response.data
    } catch (err: unknown) {
      error.value = err;
      console.error("In get-current-user, errMessage : ", err);
      throw err;
    }
  }

  async function signupUser(signupUser: SignupUserModel){
    try {
      const response = await Axios.post<ResponseMessage>("/auth/signup", signupUser);

      console.log("In signup-user-db, message : ", response?.data)
      return response.data
    } catch (err: unknown) {
      error.value = err;
      console.error("In signup-user-db, errMessage : ", err);
    }

  }

  async function refreshUserToken() {
    try {
      const response = await Axios.post<UserSession>("/auth/refresh");
      console.log("In refresh-user-token-db, session : ", response?.data)
      updateSession(response.data)
    } catch (err: unknown) {
      error.value = err;
      console.error("In refresh-user-token-db, errMessage : ", err);
    }
  }

  function updateUser(userResp: User) {
    user.value = userResp
  }

  function updateMessage(respMsg: ResponseMessage) {
    message.value = respMsg
  }

  function updateSession(session: UserSession) {
    userSession.value = session
    authService.setSession(session)
    authService.setLocalStorage(session);
  }

  function removeStoresAndLocalStorages() {
    authService.removeSession();

  }


  return {
    changeUserPassword,
    changeUserRole,
    editProfileUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    signupUser,
    refreshUserToken,
    error,
    message,
    user,
    userSession
  }
})
