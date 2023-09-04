import { v4 as uuid } from 'uuid'

const CONTEXT_SYMBOL = Symbol.for('@context')
const contextMap = { [CONTEXT_SYMBOL]: new Map<string, any>() }

const getValue = <T>(key: string): T | undefined => contextMap[CONTEXT_SYMBOL].get(key)
const setValue = <T = any>(key: string, value: T) => contextMap[CONTEXT_SYMBOL].set(key, value)

export class ContextProvider {
  private static readonly namespace = 'request'

  private static readonly correlationId = 'correlation_id'

  private static readonly userKey = 'user_id'

  private static readonly localeKey = 'locale'

  private static readonly langKey = 'lang'

  private static concatNS(key: string) {
    return `${ContextProvider.namespace}.${ContextProvider[key]}`
  }

  static get<T>(key: string): T | undefined {
    return getValue<T>(key)
  }

  static set<T = any>(key: string, value: T): void {
    setValue<T>(key, value)
  }

  static getCorrelationId(): string | undefined {
    return getValue<string>(ContextProvider.concatNS('correlationId'))
  }

  static getUserId(userId?: string) {
    if (!userId) return

    return getValue<string>(ContextProvider.concatNS('userKey'))
  }

  static getLang(lang?: string) {
    if (!lang) lang = 'en-US'

    return getValue<string>(ContextProvider.concatNS('langKey'))
  }

  static getLocale(locale?: string) {
    if (!locale) return

    return getValue<string>(ContextProvider.concatNS('localeKey'))
  }

  static setCorrelationId(correlationId?: string) {
    if (!correlationId) correlationId = uuid()

    setValue<string>(ContextProvider.concatNS('correlationId'), correlationId)
  }

  static setUserId(userId?: string) {
    if (!userId) return

    setValue<string>(ContextProvider.concatNS('userKey'), userId)
  }

  static setLang(lang?: string) {
    if (!lang) lang = 'en-US'

    setValue<string>(ContextProvider.concatNS('langKey'), lang)
  }

  static setLocale(locale?: string) {
    if (!locale) return

    setValue<string>(ContextProvider.concatNS('localeKey'), locale)
  }
}
