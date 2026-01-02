import { Gender } from '@/models/Gender.ts'


export class Customer {
  id?: string = undefined as unknown as string;
  active?: boolean = true;
  address: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  image: string = '';
  gender: Gender = Gender.Male;
  dateOfBirth: string | Date = new Date();
  userId?: string = '';
  notes: string = '';
}
