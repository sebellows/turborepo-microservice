import { ElementType, forwardRef } from 'react'

import { RefForwardingComponentAs } from './react.types'

export const forwardRefAs = <As extends React.ElementType, P = unknown>(
  render: RefForwardingComponentAs<As, P>,
) => {
  return forwardRef(render)
}

export const getChildTag = (parentTag?: ElementType) => {
  switch (parentTag) {
    case 'ul':
    case 'ol':
      return 'li'
    default:
      return 'div'
  }
}
