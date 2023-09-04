import safeStringify from 'fast-safe-stringify'
import { isEmpty, isObject, isPlainObject, isString } from '@trms/utils'

export type MaskedField = string | [string, number]

function maskString(str: string, unmaskedNum = 0, replacement = '*') {
  return str.slice(unmaskedNum).padStart(str.length, replacement).trim()
}

function replacer(_key: string, value: string) {
  return value !== '[Circular]' ? value : undefined
}

const options = {
  depthLimit: Number.MAX_SAFE_INTEGER,
  edgesLimit: Number.MAX_SAFE_INTEGER,
}

export function maskPII<T>(data: T, keys: MaskedField[], defaultUnmaskedCharCount: number): T {
  const notJsonable = !isString(data) && !isPlainObject(data) && !Array.isArray(data)
  const emptyObj = isObject(data) && isEmpty(data)

  if (notJsonable || emptyObj) {
    return data
  }

  // Use 'fast-safe-stringify' to prevent errors caused by JSON.stringify
  // when it encounters Circular references.
  let output: string = isString(data) ? data : safeStringify(data, replacer, 2, options)

  // remove quotes inside json value
  output = output.replace(/\\"/g, '')

  for (const entry of keys) {
    const entryIsArray = Array.isArray(entry)
    const key = Array.isArray(entry) ? entry[0] : entry

    // Search a stringified object for a matching key and then find it's
    // value to mask. Depending on the data type, format, and location in
    // object, value could be followed by a comma, a bracket, or it may
    // be in quotes.
    const pattern = `("${key}": ?"?)(.+?)(?=",?\]?\}?)`
    const regex = new RegExp(pattern, 'gi')

    output = output.replace(regex, (_match, p1, p2) => {
      let unmaskedCount = (entryIsArray && entry[1]) || defaultUnmaskedCharCount
      const maskWhileString = p2.length < Math.abs(unmaskedCount)

      if (unmaskedCount < 0 && maskWhileString) {
        // If string's length is less than the remainder to be unmasked,
        // mask the entire string
        unmaskedCount = p2.length
      }

      const maskedValue = maskString(p2, unmaskedCount)

      return p1 + maskedValue
    })
  }

  return JSON.parse(output)
}

export function resolveMaskedFields(maskedFields: string | MaskedField[]) {
  let maskedFieldsArr: MaskedField[] = []

  if (Array.isArray(maskedFields)) {
    maskedFieldsArr = maskedFields
  } else if (isString(maskedFields)) {
    const parsedMaskedFields = JSON.parse(maskedFields)

    if (parsedMaskedFields) {
      maskedFieldsArr = parsedMaskedFields
    }
  }

  return maskedFieldsArr
}
