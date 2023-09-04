import { Injectable } from '@nestjs/common'

export type HttpMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

export type HttpResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

type AuthCredentials = {
  username: string
  password: string
}

export type HttpRequestConfig<D = any> = {
  url?: string
  method?: HttpMethod | string
  baseURL?: string
  headers?: HeadersInit
  params?: any
  data?: D
  auth?: string | AuthCredentials
  responseType?: HttpResponseType
  signal?: AbortSignal
  maxContentLength?: number
  maxBodyLength?: number
}

export interface HttpRequestConfigFactory {
  createHttpOptions(): Promise<HttpRequestConfig> | HttpRequestConfig
}

@Injectable()
export class HttpConfigService implements HttpRequestConfigFactory {
  createHttpOptions(): HttpRequestConfig {
    const baseURL = process.env.BACKEND_BASE_URL
    return {
      baseURL,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    }
  }
}
