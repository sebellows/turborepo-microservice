import { Injectable } from '@nestjs/common'
import { User as UserModel } from '@trms/database'

import { DbService } from '../shared/db'
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

  constructor(private db: DbService) {}

  async create(userDto: CreateUserDto): Promise<UserModel> {
    return await this.db.user.create({ data: userDto, select: this.userSelect }).catch(handleError)
  }

  async findOne(userId: string): Promise<UserModel> {
    return this.db.user.findUnique({ where: { id: userId } })
  }

  async findMany(): Promise<UserModel[]> {
    return this.db.user.findMany()
  }

  async findRegisteredUsers(
    take?: number,
    skip?: number,
    orderBy?: 'asc' | 'desc',
  ): Promise<UserModel[]> {
    return this.db.user.findMany({
      where: {
        customerId: { not: null },
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy ?? 'asc',
      },
    })
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<UserModel> {
    return await this.db.user
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

    await this.db.user.delete({
      where: { id: userId },
    })

    const resp = {
      success: true,
      message: 'User record deleted successfully',
    }

    return resp
  }
}
