// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//   const gigiMessengerBag = await prisma.user.upsert({
//     where: { email: 'kcustomer@gmail.com' },
//     update: {},
//     create: {
//       username: 'kcustomer@gmail.com',
//       password: 'Password@123',
//       citizenship: 'US',
//       email: 'kcustomer@gmail.com',
//       phone: '1-347-400-2824',
//       firstName: 'Keef',
//       middleName: 'De',
//       lastName: 'Customer',
//       role: 'CUSTOMER',
//       address: {
//         create: [
//           {
//             addressLine1: '1234 Elm St.',
//             addressLine2: 'Apt 2B',
//             country: 'US',
//             municipality: 'Boise',
//             region: 'ID',
//             postalCode: 55555,
//             isBillingAddress: true,
//             isPrimaryAddress: true,
//             isShippingAddress: false,
//             isValidAddress: true,
//             poBox: false,
//             userId: '',
//           },
//           {
//             addressLine1: '333 John Oates Dr.',
//             addressLine2: 'P.O. Box 80085',
//             country: 'US',
//             municipality: 'Boise',
//             region: 'ID',
//             postalCode: 55555,
//             isBillingAddress: false,
//             isPrimaryAddress: false,
//             isShippingAddress: true,
//             isValidAddress: true,
//             poBox: true,
//           },
//         ],
//       },
//       preferredContactMethod: 'EMAIL',
//       preferredLanguage: 'en',
//       reviews: [],
//     },
//   })
// }
