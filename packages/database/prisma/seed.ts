import { PrismaClient } from '@prisma/client'
import { users } from '../seeds/users'
import { products } from '../seeds'

const prisma = new PrismaClient()

async function main() {
  const mockUsers = await Promise.all(
    users.map(
      async user =>
        await prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: user,
        }),
    ),
  )
  const mockProducts = await Promise.all(
    products.map(
      async product =>
        await prisma.product.upsert({
          where: { uid: product.uid },
          update: {},
          create: product,
        }),
    ),
  )
  console.log('mockUsers', mockUsers, '\nmockProducts', mockProducts)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
