import { useMemo, useState } from "react"
import { UIComponentProps, mapProps } from "../styles"
import { pick } from "@trms/utils"

export const UI_PROP_KEYS = Object.keys(UIComponentProps)

export const useTW = <P = {}>(
  props: P & Partial<UIComponentProps>,
  omits?: string[],
  deps: any[] = [],
) => {
  const [nonUIProps, setNonUIProps] = useState<P | null>(null)

  const uiClasses = useMemo(() => {
    const keys = omits ? UI_PROP_KEYS.filter(k => omits.indexOf(k) === -1) : UI_PROP_KEYS
    const uiProps = pick(props, ...keys)
    if (!nonUIProps) {
      const extraKeys = Object.keys(props).filter(key => UI_PROP_KEYS.indexOf(key) === -1)
      const extra = pick(props, ...extraKeys) as P
      setNonUIProps(extra)
    }
    return mapProps(uiProps)
  }, deps)

  return [uiClasses, nonUIProps]
}
