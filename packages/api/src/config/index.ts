// import dotenv from 'dotenv'
// import * as path from 'path'
// dotenv.config({ path: '../../../../.env' }) // path.join(__dirname, '../../config')

// process.env.NODE_CONFIG_DIR = process.env.NODE_CONFIG_DIR ?? path.join(__dirname, "../../config")

// console.log('user-api -> __dirname', __dirname)

// import * as envConfig from '../../config/default.json'

// interface Config {
//   env: string
//   port: number
//   apiKey: string
//   db: Db
//   swagger: Swagger
//   rateLimit: RateLimit
//   cors: Cors
//   validator: Validator
//   logging: Logging
// }

// interface Db {
//   url: string
//   logQueries: boolean
// }

// interface Swagger {
//   enabled: boolean
//   endpoint: string
//   title: string
//   description: string
//   contact: SwaggerContact
// }

// interface SwaggerContact {
//   name: string
//   url: string
//   email: string
// }

// interface RateLimit {
//   enabled: boolean
//   max: number
//   timeWindow: string
// }

// interface Cors {
//   origins: string
//   methods: string
//   allowedHeaders: string
// }

// interface Validator {
//   forbidUnknown: true
// }

// interface Logging {
//   timestampFormat: string
//   logDataConsole: boolean
// }

// export const config: Config = envConfig as Config

// export function coerceToBoolean(value: boolean | string): boolean {
//   if (typeof value === 'boolean') {
//     return value
//   }

//   return value === 'true'
// }
