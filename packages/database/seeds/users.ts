import bcrypt from 'bcryptjs'
import { Gender, Role } from '@prisma/client'
import { gen, uids } from './seed-ids'

const userId = gen('users')

export const users = [
  {
    id: userId.next(),
    firstName: 'John',
    middleName: 'Jacob',
    lastName: 'Ganondorf',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456789', 10),
    phone: 15558675309,
    role: Role.ADMIN,
  },
  {
    id: userId.next(),
    firstName: 'Zelda',
    lastName: 'Vai',
    email: 'zvai@example.com',
    password: bcrypt.hashSync('123456789', 10),
    phone: 15553337777,
    role: Role.CUSTOMER,
  },
  {
    id: userId.next(),
    firstName: 'Link',
    lastName: 'Voe',
    email: 'lvoe@example.com',
    password: bcrypt.hashSync('123456789', 10),
    gender: Gender.NON_BINARY,
    phone: 15555555555,
    role: Role.CUSTOMER,
  },
]
