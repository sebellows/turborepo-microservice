import { isEmpty, isPlainObject } from '@trms/utils'
import { isBooleanObject } from 'util/types'
import path from 'node:http2'

// const BASE_URL = 'http://localhost:5000'
const BASE_URL = `${process.env.HOST}:${process.env.API_PORT}`

type HttpClientHandlers = {
  onAbort?: (error: unknown) => void
  onError?: (error: unknown) => void
  onException?: (exception: unknown) => void
}
// type ApiValidatorFn<T> = T extends (data: infer TData) => any ? TData : never
export type ApiValidator = <T>(data: unknown) => data is T
// type Assertion = <T>(data: unknown) => ReturnType<ApiValidator> extends true ? ApiValidatorFn<T> : never

type QueryParams = string | URLSearchParams | string[][] | Record<string, string>
type HTTP_METHOD = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'

type ConfigOptions = NodeJS.RequestInit & {
  validate?: ApiValidator
  handlers?: HttpClientHandlers
  params?: QueryParams
  responseType?: XMLHttpRequestResponseType
}

function createAbortController() {
  const controller = new AbortController()
  const signal = controller.signal
  return { controller, signal }
}

function applyErrorHandler(handlers?: HttpClientHandlers) {
  return (error: any) => {
    if (!isPlainObject(error)) {
      console.error('API HTTP Error', error)
      throw new Error(error)
    }
    if (error.name === 'AbortError') {
      console.error('Request aborted.', error)
      handlers?.onAbort?.(error)
      return void 0
    }
    if (error instanceof Error) {
      console.error('error', error)
      handlers?.onError?.(error)
      throw error
    }
    console.error('exception', error)
    throw error
  }
}

function normalizeUri(uri: string) {
  return uri.startsWith('/') ? uri : `/${uri}`
}

function toQueryParams(params: QueryParams) {
  if (isEmpty(params)) return ''
  console.log('toQueryParams', isEmpty(params), params)

  const queryParams = new URLSearchParams(params)

  return `?${queryParams.toString()}`
}

function composeUrl(uri: string, ...params: (string | QueryParams)[]) {
  let url = `${BASE_URL}${normalizeUri(uri)}`
  let queryParams: QueryParams

  if (params.length) {
    queryParams = params.find(param => typeof param !== 'string')

    const strParams = params.filter(param => typeof param === 'string')
    if (strParams.length) {
      for (const param of strParams) {
        url += `/${param}`
      }
    }
  }

  if (queryParams) {
    url += toQueryParams(queryParams)
  }

  return url
}

function applyValidation(validate: ApiValidator) {
  return <TData>(data: TData): TData | never => {
    try {
      const isValid = validate<TData>(data)
      if (typeof isValid !== 'boolean') {
        throw new TypeError('The applied `validate` function must return a boolean!')
      }
      return data as TData
    } catch (error) {
      applyErrorHandler()(error)
    }
  }
}

const DEFAULT_HTTP_OPTIONS = { cache: 'no-cache' }

export const api = (() => {
  let abortController: AbortController

  const http =
    (method: HTTP_METHOD) =>
    async <T extends unknown = any>(
      uri: string,
      options: ConfigOptions = {},
    ): Promise<T | never> => {
      const { handlers = {}, params = {}, responseType = 'json', validate, ...init } = options
      const { controller, signal } = createAbortController()
      abortController = controller
      const requestOptions: RequestInit = Object.assign(
        DEFAULT_HTTP_OPTIONS,
        { signal, method },
        init,
      )
      const url = composeUrl(uri, params)
      const errorHandler = applyErrorHandler(handlers)
      const resp = await fetch(url, requestOptions).catch(errorHandler)
      const data = await resp[responseType]()

      if (validate) {
        const validator = applyValidation(validate)
        const validData = validator<T>(data)
        return validData
      }

      return data
    }

  return {
    get: http('GET'),
    post: http('POST'),
    put: http('PUT'),
    delete: http('DELETE'),
    cancel: () => {
      abortController.abort()
    },
  }
})()
