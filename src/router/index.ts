import { createRouter, createWebHistory } from 'vue-router'
import LoginUserPage from '@/pages/auth/LoginUserPage.vue'
import SignupUserPage from '@/pages/auth/SignupUserPage.vue'
import EditUserProfilePage from '@/pages/auth/EditUserProfilePage.vue'
import ChangeUserPasswordPage from '@/pages/auth/ChangeUserPasswordPage.vue'
import CustomerListPage from '@/pages/customers/CustomerListPage.vue'
import ActiveCustomers from '@/pages/customers/ActiveCustomers.vue'
import InactiveCustomers from '@/pages/customers/InactiveCustomers.vue'
import UsersListPage from '@/pages/users/UsersListPage.vue'
import UserDetailPage from '@/pages/users/UserDetailPage.vue'
import CustomerDetailPage from '@/pages/customers/CustomerDetailPage.vue'
import CustomerAddPage from '@/pages/customers/CustomerAddPage.vue'
import CustomerEdit from '@/pages/customers/CustomerEdit.vue'
import TicketListPage from '@/pages/tickets/TicketListPage.vue'
import IncompletedTickets from '@/pages/tickets/IncompletedTickets.vue'
import CompletedTickets from '@/pages/tickets/CompletedTickets.vue'
import TicketsByEmailPage from '@/pages/tickets/TicketsByEmailPage.vue'
import TicketDetailPage from '@/pages/tickets/TicketDetailPage.vue'
import TicketAddPage from '@/pages/tickets/TicketAddPage.vue'
import TicketEditPage from '@/pages/tickets/TicketEditPage.vue'
import {useAuthServiceStore} from '@/stores/auth/auth.service.ts'
import { Role } from '@/models/Role.ts'
import UnauthorizedPage from '@/pages/UnauthorizedPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginUserPage, name: 'login' },
    { path: '/signup', component: SignupUserPage, name: 'signup' },
    {
      path: '/edit-profile',
      component: EditUserProfilePage,
      name: 'edit-profile',
      meta: { requiresAuth: true },
    },
    {
      path: '/change-password',
      component: ChangeUserPasswordPage,
      name: 'change-password',
      meta: { requiresAuth: true },
    },
    { path: '/unauthorized', component: UnauthorizedPage, name: 'unauthorized' },

    {
      path: '/customers',
      component: CustomerListPage,
      name: 'customers',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/customers/add',
      component: CustomerAddPage,
      name: 'add-customer',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/customers/:id/delete',
      component: CustomerDetailPage,
      name: 'customer-delete',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/customers/:id/detail',
      component: CustomerDetailPage,
      name: 'customer-detail',
      meta: { requiresAuth: true },
    },
    {
      path: '/customers/:id/edit',
      component: CustomerEdit,
      name: 'customer-edit',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/customers/all-active/get-all-active-customers',
      component: ActiveCustomers,
      name: 'active-customers',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/customers/all-in-active/get-all-in-active-customers',
      component: InactiveCustomers,
      name: 'inactive-customers',
      meta: { roles: ['Admin'] },
    },

    { path: '/tickets', component: TicketListPage, name: 'tickets', meta: { roles: ['Admin'] } },
    {
      path: '/tickets/add',
      component: TicketAddPage,
      name: 'ticket-add',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/tickets/completed-tickets',
      component: CompletedTickets,
      name: 'completed-tickets',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/tickets/incomplete-tickets',
      component: IncompletedTickets,
      name: 'incomplete-tickets',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/tickets/get-tickets-by-email/:emailParam',
      component: TicketsByEmailPage,
      name: 'tickets-by-email',
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets/:id/delete',
      component: TicketDetailPage,
      name: 'ticket-delete',
      meta: { roles: ['Admin'] },
    },
    {
      path: '/tickets/:id/detail',
      component: TicketDetailPage,
      name: 'ticket-detail',
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets/:id/edit',
      component: TicketEditPage,
      name: 'ticket-edit',
      meta: { roles: ['Admin'] },
    },

    { path: '/users', component: UsersListPage, name: 'users', meta: { roles: ['Admin'] } },
    {
      path: '/users/:id/detail',
      component: UserDetailPage,
      name: 'user-detail',
      meta: { requiresAuth: true },
    },
    {
      path: '/users/:id/delete',
      component: UserDetailPage,
      name: 'user-delete',
      meta: { roles: ['Admin'] },
    },
  ],
})

// In your router/index.js file, after creating the router instance:

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuthServiceStore()?.sessionAuth?.isLoggedIn;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires auth, check if the user is logged in
    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      next({
        path: '/login',
        query: { redirect: to.fullPath } // Optional: add a redirect query for post-login redirection
      });
    } else {
      next(); // Authentication successful, proceed to the route
    }
  } else {
    next(); // Does not require auth, allow navigation
  }
});

router.beforeEach((to, from) => {
  const userStore = useAuthServiceStore() // or use inject() in Vue 3.3+
  console.log('In router-index, userStore', userStore.sessionAuth,)
  const userRole = userStore.sessionAuth?.role;
  const routeRoles = to.meta.roles as string[];

  if (routeRoles && !routeRoles.includes(userRole)) {
    // Redirect to an unauthorized page or login page
    return '/unauthorized'
  }
  // Proceed with navigation
  return true
})

export default router;

