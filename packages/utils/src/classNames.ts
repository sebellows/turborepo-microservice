import { hasOwn } from './common'
import { typeOf } from './lang'

export const classNames = (...args: any[]) => {
  let classes: string[] = []

  for (let arg of args) {
    if (!arg) continue

    const type = typeOf(arg)

    switch (type) {
      case 'string':
      case 'number':
        classes.push(arg)
        break
      case 'array':
        if (arg.length) {
          let inner = classNames.apply(null, arg)
          if (inner) {
            classes.push(inner)
          }
        }
        break
      case 'object':
        for (let key in arg) {
          if (hasOwn(arg, key, true)) {
            classes.push(key)
          }
        }

        break
    }
  }

  return classes.join(' ')
}
