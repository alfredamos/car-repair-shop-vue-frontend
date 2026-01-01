import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { UserSession } from '@/models/auth/UserSession.ts'
import { User } from '@/models/auth/user.model.ts'
import { LocalStorageKey } from '@/models/LocalStorageKey.ts'
import { initialUserSession } from '@/stores/auth/initialUserSession.ts'

export const useAuthServiceStore = defineStore('auth-service', () => {
 const authSession = ref<UserSession>(new UserSession())
 const currentUser = ref<User>(new User());

  const isAdmin = computed(() => authSession.value?.isAdmin || getLocalStorage()?.isAdmin);
  const isLoggedIn = computed(() => authSession.value?.isLoggedIn || getLocalStorage()?.isLoggedIn);
  const email = computed(() => authSession.value?.email || getLocalStorage()?.email);
  const userCurrent = computed(() => currentUser.value || getCurrentUserLocalStorage());
  const sessionAuth = computed(() => authSession.value || getLocalStorage());


  function setSession(userSession: UserSession){
    authSession.value = userSession;
    setLocalStorage(userSession);
  }

  function removeSession(){
    authSession.value = initialUserSession;
    removeCurrentUser();
    removeCurrentUserLocalStorage();
    removeStorage();
  }

  function setLocalStorage(session: UserSession){
    localStorage.setItem(LocalStorageKey.authKey, JSON.stringify(session))
  }

  function getLocalStorage(){
    return JSON.parse(localStorage.getItem(LocalStorageKey.authKey) as string) as UserSession;
  }

  function removeStorage(){
    localStorage.removeItem(LocalStorageKey.authKey);
  }

  function updateCurrentUser(user: User){
    currentUser.value = user;
  }

  function removeCurrentUser(){
    currentUser.value = new User();
  }

  function setCurrentUserLocalStorage(user: User){
    localStorage.setItem(LocalStorageKey.currentUserKey, JSON.stringify(user));
  }

  function getCurrentUserLocalStorage(){
    return JSON.parse(localStorage.getItem(LocalStorageKey.currentUserKey) as string) as User;
  }

  function removeCurrentUserLocalStorage(){
    removeCurrentUser()
    localStorage.removeItem(LocalStorageKey.currentUserKey)
  }

  return {
    isLoggedIn,
    isAdmin,
    email,
    userCurrent,
    sessionAuth
  , setSession,
    setLocalStorage,
    removeSession,
    setCurrentUserLocalStorage
  , updateCurrentUser
  , removeCurrentUserLocalStorage}
});
