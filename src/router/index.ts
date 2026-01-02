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



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginUserPage, name: 'login' },
    { path: '/signup', component: SignupUserPage, name: 'signup' },
    { path: '/edit-profile', component: EditUserProfilePage, name: 'edit-profile' },
    { path: '/change-password', component: ChangeUserPasswordPage, name: 'change-password' },

    { path: '/customers', component: CustomerListPage, name: 'customers' },
    { path: '/customers/add', component: CustomerAddPage, name: 'add-customer' },
    {
      path: '/customers/:id/delete',
      component: CustomerDetailPage,
    },
    { path: '/customers/:id/detail', component: CustomerDetailPage },
    { path: '/customers/:id/edit', component: CustomerEdit },
    {
      path: '/customers/all-active/get-all-active-customers',
      component: ActiveCustomers,
      name: 'active-customers',
    },
    {
      path: '/customers/all-in-active/get-all-in-active-customers',
      component: InactiveCustomers,
      name: 'inactive-customers',
    },

    { path: '/tickets', component: TicketListPage, name: 'tickets' },
    { path: '/tickets/add', component: TicketAddPage, name: 'ticket-add' },
    { path: '/tickets/completed-tickets', component: CompletedTickets, name: 'completed-tickets' },
    {
      path: '/tickets/incomplete-tickets',
      component: IncompletedTickets,
      name: 'incomplete-tickets',
    },
    {
      path: '/tickets/get-tickets-by-email/:emailParam',
      component: TicketsByEmailPage,
      name: 'tickets-by-email',
    },
    { path: '/tickets/:id/delete', component: TicketDetailPage, name: 'ticket-delete' },
    { path: '/tickets/:id/detail', component: TicketDetailPage, name: 'ticket-detail' },
    { path: '/tickets/:id/edit', component: TicketEditPage, name: 'ticket-edit' },

    { path: '/users', component: UsersListPage, name: 'users' },
    { path: '/users/:id/detail', component: UserDetailPage, name: 'user-detail' },
    { path: '/users/:id/delete', component: UserDetailPage, name: 'user-delete' },
  ],
})

export default router
