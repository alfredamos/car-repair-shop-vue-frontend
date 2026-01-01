import type { UserSession } from '@/models/auth/UserSession.ts'
import { Role } from '@/models/Role.ts'

export const initialUserSession: UserSession = {
  accessToken: '',
  id: '',
  isAdmin: false,
  isLoggedIn: false,
  name: '',
  email: '',
  role: Role.User,
}
