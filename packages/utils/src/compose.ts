/**
 * Taken from default-composer
 * @see {@link https://github.com/aralroca/default-composer}
 * @license MIT {@see https://github.com/aralroca/default-composer/blob/main/LICENSE}
 */

import { isEmpty, isPlainObject } from './lang'

type isDefaultableValueInputType = {
  defaultableValue: boolean
  key: string
  value: unknown
}

type isDefaultableValueType = ({
  defaultableValue,
  key,
  value,
}: isDefaultableValueInputType) => boolean

type Config = {
  isDefaultableValue?: isDefaultableValueType
}

let config: Config = {}

export function setComposerConfig(newConfig: Config): void {
  config = newConfig
}

export function composer<T>(...args: Partial<T>[]): T {
  return args.reduce(compose, args[0]) as T
}

function compose<T>(defaults: Partial<T>, obj: Partial<T>): Partial<T> {
  const result: Partial<T> = {}
  const allKeys = new Set([defaults, obj].flatMap(Object.keys))

  for (let key of allKeys) {
    const defaultsValue = defaults[key]
    const originalObjectValue = obj[key]
    const hasDefault = key in defaults
    const checkOptions = { key, value: originalObjectValue }
    const defaultableValue = isEmpty(checkOptions)
    const defaultableValueFromConfig =
      config.isDefaultableValue?.({ ...checkOptions, defaultableValue }) ?? defaultableValue

    if (hasDefault && defaultableValueFromConfig) {
      result[key] = defaultsValue
      continue
    }

    if (isPlainObject(defaultsValue) && isPlainObject(originalObjectValue)) {
      result[key] = compose(defaultsValue, originalObjectValue)
      continue
    }

    result[key] = originalObjectValue
  }

  return result
}
