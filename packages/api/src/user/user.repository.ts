import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Profile as ProfileModel, User as UserModel } from '@trms/database'

import { DbService } from '../shared/db/db.service'

import { UserNotFoundException } from './exceptions'

type UserProfile = Pick<ProfileModel, 'gender' | 'avatar' | 'username'>

const defaultUsername = (email: string) =>
  email.split('@')[0] + Math.floor(Math.random() * (9999 - 1000) + 1000)

@Injectable()
export class UserRepository {
  constructor(private config: ConfigService, private db: DbService) {}

  async createUser(
    userData: Pick<
      UserModel,
      'email' | 'firstName' | 'middleName' | 'lastName' | 'password' | 'phone' | 'preferredLanguage'
    > &
      Partial<UserProfile>,
  ): Promise<UserModel> {
    const avatarUrl = this.config.get<string>('cloudinary.defaultAvatarUrl')
    const {
      avatar = JSON.stringify({ src: avatarUrl }),
      gender = null,
      username = defaultUsername(userData.email),
      ...user
    } = userData

    let profileData: UserProfile = { avatar, gender, username }

    if (gender) profileData.gender = gender

    return this.db.user.create({
      data: { ...user, profile: { create: profileData } },
    })
  }

  async getUser(userId: string): Promise<UserModel> {
    const user = this.db.user.findUnique({ where: { id: String(userId) } })

    if (!user) {
      throw new UserNotFoundException(userId)
    }

    return user
  }

  async getUsers(): Promise<UserModel[]> {
    return this.db.user.findMany()
  }

  async getRegisteredUsers(
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
}
