import { useMemo } from 'react'
import { classNames, toPx } from '@trms/utils'

import { forwardRefAs } from '../../shared'

import { BoxProps } from '../Box'
import { Center } from '../Center'

// import './Spinner.style.css'
type SpinnerProps = { size?: number } & Partial<BoxProps>

export const Spinner = forwardRefAs<"div", SpinnerProps>(
  ({ as: Tag = "div", size = 80 }, ref) => {
    const borderWidthValue = useMemo(
      () => (size <= 80 ? 4 : Math.floor(size / 20)),
      [size]
    );

    return (
      <Center as={Tag} className="ripple" ref={ref}>
        <div
          className={classNames(
            `border-[${toPx(borderWidthValue)}]`,
            "ripple-element"
          )}
        />
        <div
          className={classNames(
            `border-[${toPx(borderWidthValue)}]`,
            "ripple-element"
          )}
        />
        <div
          className={classNames(
            `border-[${toPx(borderWidthValue)}]`,
            "ripple-element"
          )}
        />
      </Center>
    );
  }
);
