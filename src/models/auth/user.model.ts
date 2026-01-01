import { Gender } from '@/models/Gender.ts'
import { Role } from '@/models/Role.ts'

export class User {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  phone: string = "";
  gender: Gender = Gender.Male;
  image: string = "";
  role?: Role = Role.User;
}
