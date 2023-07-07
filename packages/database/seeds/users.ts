import bcrypt from 'bcryptjs'
import { Role } from '@prisma/client'

// import { profiles } from './profiles'

export const users = [
  {
    // uid: at(0),
    firstName: 'Ernest',
    middleName: 'Miller',
    lastName: 'Hemingway',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456789', 10),
    phone: '15558675309',
    role: Role.ADMIN,
    address: {
      create: [
        {
          addressLine1: '2598 36th St.',
          addressLine2: 'Apt 6J',
          municipality: 'Astoria',
          region: 'NY',
          country: 'US',
          postalCode: '11103',
          isBillingAddress: true,
          isPrimaryAddress: true,
          isShippingAddress: true,
          isValidAddress: true,
          poBox: false,
        },
        // {
        //   addressLine1: '19 W 21st St',
        //   addressLine2: '#1101',
        //   municipality: 'New York',
        //   region: 'NY',
        //   country: 'US',
        //   postalCode: '10010',
        //   isBillingAddress: false,
        //   isPrimaryAddress: false,
        //   isShippingAddress: true,
        //   isValidAddress: true,
        //   poBox: false,
        // },
      ],
    },
    // profile: { create: { ...profiles[0] } },
  },
  {
    // uid: at(1),
    firstName: 'Zelda',
    lastName: 'Fitzgerald',
    email: 'zeldahasfitz@example.com',
    password: bcrypt.hashSync('123456789', 10),
    phone: '15553337777',
    role: Role.CUSTOMER,
    address: {
      create: [
        {
          addressLine1: '18 Avenue A',
          addressLine2: 'Apt #1020',
          municipality: 'New York',
          region: 'NY',
          country: 'US',
          postalCode: '11105',
          isBillingAddress: true,
          isPrimaryAddress: true,
          isShippingAddress: true,
          isValidAddress: true,
          poBox: false,
        },
      ],
    },
    // profile: { create: { ...profiles[1] } },
  },
  {
    // uid: at(2),
    firstName: 'Anais',
    lastName: 'Nin',
    email: 'aninymous@example.com',
    password: bcrypt.hashSync('123456789', 10),
    phone: '15555555555',
    role: Role.CUSTOMER,
    address: {
      create: [
        {
          addressLine1: '55 44th Ave.',
          addressLine2: 'Ste 10J',
          municipality: 'Brooklyn',
          region: 'NY',
          country: 'US',
          postalCode: '11112',
          isBillingAddress: true,
          isPrimaryAddress: true,
          isShippingAddress: true,
          isValidAddress: false,
          poBox: false,
        },
      ],
    },
    // profile: { create: { ...profiles[2] } },
  },
]
