const cardFields = ['paymentMethod', 'accountNo', 'cvc', 'expiry']

const emailFields = ['primaryEmail', 'email']

const identityFields = [
  'authorization',
  'avatar',
  'password',
  'token',
  'apiKey',
  'secret',
  'firstName',
  'middleName',
  'lastName',
  'uid',
  'userId',
  'username',
]

const phoneFields = ['homePhone', 'mobile', 'workPhone', 'phone']

const addressFields = ['addressLine1', 'addressLine2', 'municipality', 'region']

export const maskedFields = [
  ...cardFields,
  ...emailFields,
  ...identityFields,
  ...phoneFields,
  ...addressFields,
]
