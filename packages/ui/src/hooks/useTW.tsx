import { useMemo } from "react"
import { UIComponentProps, mapProps } from "@trms/theme"
import { pick } from "@trms/utils"

export const UI_PROP_KEYS = Object.keys(UIComponentProps)

export function useTW<P = {}>(
  props: P & Partial<UIComponentProps>,
  exclude: string[] = [],
  deps: any[] = [],
) {
  const uiClassesAndNonUIProps = useMemo(() => {
    const keys = !!exclude?.length
      ? UI_PROP_KEYS.filter(k => exclude.indexOf(k) === -1)
      : UI_PROP_KEYS
    const uiProps = pick(props, ...keys)
    const uiClasses = mapProps(uiProps)

    const excludeProps = [...UI_PROP_KEYS, ...exclude]
    const extraKeys = Object.keys(props).filter(key => excludeProps.indexOf(key) === -1)
    const extra = pick(props, ...extraKeys) as P

    return [uiClasses, extra]
  }, deps)

  return uiClassesAndNonUIProps
}
