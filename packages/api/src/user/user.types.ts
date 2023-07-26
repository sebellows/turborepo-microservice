import { Gender, Profile as ProfileModel, User as UserModel } from '@trms/database'

export type UserProfile = Pick<ProfileModel, 'gender' | 'avatar' | 'username'>

export type CreateUserData = Pick<
  UserModel,
  'email' | 'firstName' | 'middleName' | 'lastName' | 'password' | 'phone' | 'preferredLanguage'
> &
  Partial<UserProfile>

export namespace ShopUser {
  type User = {}
  export type UserInput = User & {}
  export type UserOutput = User & {}
  export type UserRecord = {
    id: string
    createAt: Date
    updatedAt: Date
  } & UserOutput
}
export type UserAddressData = {
  addressLine1: string
  addressLine2?: string
  municipality: string
  region: string
  country: string
  postalCode: string
  isBillingAddress?: boolean
  isPrimaryAddress?: boolean
  isShippingAddress?: boolean
  isValidAddress?: boolean
  poBox?: boolean
}

export type ProfileData = {
  avatar?: string // JSON
  gender?: Gender
  productReviews?: Record<string, any>[] // TODO: Review[]
  username?: string
}

export type UserPaymentData = {
  paymentMethod: string
  provider: string
  accountNo: string
  expiry: Date
}
