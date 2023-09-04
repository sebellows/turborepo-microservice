import dotenv from 'dotenv'
import * as path from 'path'

import pkg from '../package.json'

import { maskedFields } from './maskedFields'

console.log('Current NODE_ENV', process.env.NODE_ENV)

dotenv.config({ path: '../../../.env' }) // path.join(__dirname, '../../config')

process.env.ENV_CONFIG_DIR = process.env.ENV_CONFIG_DIR ?? path.join(__dirname, '../../../../.env')

console.log('configuration.ts -> __dirname', __dirname)

export default () => ({
  appName: pkg.name,
  appVersion: pkg.version,
  appTitle: process.env.OWNER_NAME,
  host: process.env.HOST,
  environment: process.env.NODE_ENV,
  locale: 'en-US',
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_SECRET,
    basepath: 'https://res.cloudinary.com/',
    uripath: '/image/upload/',
    defaultAvatarUrl: `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/v1688147328/shop/ugly-avatar_evave0.png`,
  },
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    url: process.env.DATABASE_URL,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
  },
  logger: {
    enableTimestamp: true,
    logLevel: 'info',
    localeOptions: {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    },
    maskedFields,
  },
  api: {
    port: process.env.API_PORT,
  },
})
