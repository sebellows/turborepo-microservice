import { Injectable } from '@nestjs/common'
import { User as UserModel } from '@trms/database'

import { PrismaService } from '../shared/prisma'
import { handleError } from '../common/errors'
import { isAdmin } from '../common/utils'

import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/update-user-dto'

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    customerId: true,
    firstName: true,
    middleName: true,
    lastName: true,
    email: true,
    password: false,
    phone: true,
    preferredLanguage: true,
    role: true,
    uid: true,
    createdAt: true,
    updatedAt: true,
    // relations
    address: true,
    cart: true,
    orders: true,
    profile: true,
    session: true,
  }

  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<UserModel> {
    return await this.prisma.user
      .create({ data: userDto, select: this.userSelect })
      .catch(handleError)
  }

  async findOne(userId: string): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    delete user.password
    return user
  }

  async findMany(): Promise<UserModel[]> {
    const users = await this.prisma.user.findMany()
    users.forEach(user => {
      delete user.password
    })
    return users
  }

  async findRegisteredUsers(
    take?: number,
    skip?: number,
    orderBy?: 'asc' | 'desc',
  ): Promise<UserModel[]> {
    const users = await this.prisma.user.findMany({
      where: {
        customerId: { not: null },
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy ?? 'asc',
      },
    })

    users.forEach(user => {
      delete user.password
    })
    return users
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<UserModel> {
    return await this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: userDto,
        select: { ...this.userSelect, customerId: true },
      })
      .catch(handleError)
  }

  async deleteUser(userId: string, user: UserModel) {
    isAdmin(user)

    await this.findOne(userId)

    await this.prisma.user.delete({
      where: { id: userId },
    })

    const resp = {
      success: true,
      message: 'User record deleted successfully',
    }

    return resp
  }
}
