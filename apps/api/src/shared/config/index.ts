import { get } from '@trms/utils'

import configurationFn from '../../../config/configuration'

export type Config = ReturnType<typeof configurationFn>

let configuration: Config

declare global {
  var configuration: Config | undefined
}

if (!global.configuration) {
  global.configuration = configurationFn()
}

configuration = global.configuration || configurationFn()

export const config = <TPath extends string>(path: TPath, defaultValue?: any) => {
  return get(configuration, path, defaultValue)
}
