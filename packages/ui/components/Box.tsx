import React from "react";
import { forwardRefAs } from "../shared/react.utils";
import { classNames, isNil } from "@trms/utils";

const displayOptions = {
  block: 'block',
  inlineBlock: 'inline-block',
  inline: 'inline',
  flex: 'flex',
  inlineFlex: 'inline-flex',
  grid: 'grid',
  inlineGrid: 'inline-grid',
  none: 'hidden',
  table: 'table',
  inlineTable: 'inline-table',
}
const alignmentOptions = {
  center: "center",
  end: "flex-end",
  start: "flex-start",
  stretch: "stretch",
};

const justifyOptions = {
  ...alignmentOptions,
  normal: 'normal',
  between: 'between',
  around: 'around',
  evenly: 'evenly'
};

const flexOptions = {
  '1': "1",
  auto: 'auto',
  initial: 'initial',
  none: 'none',
}

const directionOptions = {
  row: 'row',
  rowReverse: 'row-reverse',
  col: 'col',
  colReverse: 'col-reverse'
}
const flexWrapOptions = {
  wrap: "wrap",
  reverse: "wrap-reverse",
  nowrap: "nowrap",
}

const positionOptions = {
  absolute: 'absolute',
  fixed: 'fixed',
  relative: 'relative',
  static: 'static',
  sticky: 'sticky',
}

export type BoxProps = {
  className?: string | undefined
  dark?: boolean
  align?: keyof typeof alignmentOptions
  axis?: 'x' | 'y' | null | undefined
  flexDirection?: keyof typeof directionOptions
  display?: keyof typeof displayOptions
  flex?: keyof typeof flexOptions
  flexWrap?: keyof typeof flexWrapOptions
  gap?: number
  justify?: keyof typeof justifyOptions
  position?: keyof typeof positionOptions
}

export const parseBoxStyles = <P extends BoxProps>(props: P) => {
  let classes: string[] = []

  const { align, axis, display, flex, flexDirection, flexWrap, gap, justify, position } = props

  let isFlex = false

  if (display && displayOptions?.[display]) {
    isFlex = ['grid', 'inline-grid', 'flex', 'inline-flex'].some(d => displayOptions[display] === d)
    classes.push(displayOptions[display])
  }
  if (position && positionOptions?.[position]) {
    classes.push(position)
  }
  if (isFlex) {
    if (flexWrap && flexWrapOptions?.[flexWrap]) {
      classes.push(`flex-${flexWrapOptions[flexWrap]}`)
    }
    if (align) {
      classes.push(`items-${alignmentOptions[align]}`)
    }
    if (justify && justifyOptions?.[justify]) {
      classes.push(`justify-${justifyOptions[justify]}`)
    }
    if (!isNil(gap)) {
      const gapClass = ['gap', axis, gap].filter(isNil).join('-')
      classes.push(gapClass)
    }
    if (flexDirection && directionOptions?.[flexDirection]) {
      classes.push(`flex-${directionOptions[flexDirection]}`)
    }
    if (flex && flexOptions?.[flex]) {
      classes.push(`flex-${flex}`)
    }
  }

  return classNames(classes, props?.className)
}

export const Box = forwardRefAs<'div', BoxProps>((props, ref) => {
  const { as: Tag = 'div' } = props

  return <Tag data-ui="box" className={parseBoxStyles(props)} ref={ref} {...props} />;
})