import { Prisma, PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// export const prisma = global.prisma || new PrismaClient()

export const registerPrisma = (opts: Prisma.PrismaClientOptions = {}) => {
  return global.prisma || new PrismaClient(opts)
}

export const prismaDefineExtension = Prisma.defineExtension

// if (process.env.NODE_ENV !== 'production') global.prisma = prisma
export const Client = PrismaClient

export * from '@prisma/client'
