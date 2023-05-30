import { Primitive } from "type-fest";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  PropsWithChildren,
} from "react";

import { isObject, isPlainObject, variadic } from "../shared/utils";

import { useTheme } from "./hooks";
import { ValueOf } from "../shared";
import { Interpolation, CSSObject, ComponentSelector } from "@emotion/react";

/**
 * `useMatchMedia`
 * Verify a matched media-query size.
 *
 * @example
 * ```
 * // Accepts an object of features to test
 * const isMinLg = useMatchMedia({minWidth: '992px'});
 * // Or a regular media query string
 * const isMaxSm = useMatchMedia('max-width: 576px')
 * const reduceMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
 * ```
 */

const breakpointKeys = [
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
  "prefersReducedMotion",
] as const;
type Breakpoint = (typeof breakpointKeys)[number];

type BreakpointOptions = {
  literal?: boolean | undefined;
  overlap?: boolean | undefined;
};
// type DynamicStyle = {
//   [key: string]: {
//     [key: string]: string | number | (string | number)[] | null | undefined;
//   };
// };
type BaseStyleObject =
  | CSSObject
  | {
      [K in keyof CSSObject]:
        | ValueOf<CSSObject, K>
        | undefined;
    };
// type MQStyleObject =
//   | Partial<BaseStyleObject>
//   | Record<string, Partial<BaseStyleObject>>; // object | object[]
// type MQStyleArgs = MQStyleObject | MQStyleObject[];
// type MQStyleFunction = {
//   (...args: MQStyleArgs[]): (CSSObject | { [key: string]: CSSObject })[];
// };

/**
 * Parse styles and applies to media-query strings.
 * Adapted from https://github.com/emotion-js/facepaint
 *
 * NOTE: `breakpoints` should come from `theme.breakpoints`.
 */
export function parseMediaQueryStyles(
  breakpoints: Record<string, string> | string[],
  { literal, overlap }: BreakpointOptions = {}
) {
  const bpDeclarations = isPlainObject(breakpoints) ? Object.values(breakpoints) : breakpoints
  const mqs = literal ? bpDeclarations : ["&"].concat(bpDeclarations);

  function flatten(...args: CSSObject[]) {
    const [obj, ...extra] = args;

    if (!isObject(obj)) return [];

    if (extra.length > 0) {
      return flatten(...extra);
    }

    // Map of breakpoint name to assigned CSS block
    const slots = {};
    const objects = {};
    const props = {};

    Object.entries(obj).forEach(([key, item]) => {
      // Check if value is an array, but skip if it looks like a selector.
      // key.indexOf('&') === 0

      // If item is not an array when literal flag is set, create an array for it
      if (!Array.isArray(item) && literal) item = [item];

      // Check if `literal` flag is set or `item` is an array AND the first character is "&" selector
      if (Array.isArray(item) && key.charCodeAt(0) !== 38) {
        let prior: (typeof item)[number];
        item.forEach((value, index) => {
          // Optimize by removing duplicated media query entries
          // when they are explicitly known to overlap.
          if (overlap && prior === value) {
            return;
          }

          if (value == null) {
            // Do not create entries for undefined values as this will
            // generate empty media quries
            return;
          }

          prior = value;

          if (index === 0 && !literal) {
            props[key] = value;
          } else if (slots[mqs[index]] === undefined) {
            slots[mqs[index]] = { [key]: value };
          } else {
            slots[mqs[index]][key] = value;
          }
        });
      } else if (isObject(item)) {
        // We have a nested block
        objects[key] = flatten(item as Omit<Interpolation<any>, keyof ComponentSelector>);
      } else {
        props[key] = item;
      }
    });

    // Ensure that all slots and then child objects are pushed to the end
    mqs.forEach((el) => {
      if (slots[el]) {
        props[el] = slots[el];
      }
    });

    Object.assign(props, objects);

    return props;
  }

  return (...values: (CSSObject | Record<string, CSSObject> | Record<string, ValueOf<CSSObject>>)[]) =>
    values.map((v) => flatten(...variadic(v)));
}

export const useMediaQuery = () => {
  const { breakpoints } = useTheme()

  const mq = parseMediaQueryStyles(breakpoints);

  return { mq }
}

const useMatchMedia = (query: string) => {
  const [state, setState] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addEventListener("change", onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return state;
};

export type UseMeasureRect = Pick<
  DOMRectReadOnly,
  "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width"
>;
export type UseMeasureRef<E extends HTMLElement = HTMLElement> = (
  element: E
) => void;
export type UseMeasureResult<E extends HTMLElement = HTMLElement> = [
  UseMeasureRef<E>,
  UseMeasureRect
];

const defaultState: UseMeasureRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export const useMeasure = <
  E extends HTMLElement = HTMLElement
>(): UseMeasureResult<E> => {
  const [element, ref] = useState<E | null>(null);
  const [rect, setRect] = useState<UseMeasureRect>(defaultState);

  const observer = useMemo(
    () =>
      new window.ResizeObserver(
        (entries: ResizeObserverEntry[], _observer: ResizeObserver) => {
          if (entries[0]) {
            const { x, y, width, height, top, left, bottom, right } =
              entries[0].contentRect;
            setRect({ x, y, width, height, top, left, bottom, right });
          }
        }
      ),
    []
  );

  React.useLayoutEffect(() => {
    if (!element) return;

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);

  return [ref, rect];
};

interface MediaQueryProviderProps {
  isSm?: boolean;
  isMd?: boolean;
  isLg?: boolean;
  isXL?: boolean;
  isXXL?: boolean;
  isPrefersReducedMotion?: boolean;
  ref?: any;
  rect?: UseMeasureRect;
}

export const MediaQueryContext = createContext<MediaQueryProviderProps | null>(
  null
);

export function MediaQueryProvider({
  children,
}: PropsWithChildren<MediaQueryProviderProps>) {
  const { breakpoints } = useTheme();
  const isSm = useMatchMedia(breakpoints.sm);
  const isMd = useMatchMedia(breakpoints.md);
  const isLg = useMatchMedia(breakpoints.lg);
  const isXL = useMatchMedia(breakpoints.xl);
  const isXXL = useMatchMedia(breakpoints.xxl);
  const isPrefersReducedMotion = useMatchMedia(
    breakpoints.prefersReducedMotion
  );

  const [ref, rect] = useMeasure();

  const context = useMemo(
    () => ({
      isSm,
      isMd,
      isLg,
      isXL,
      isXXL,
      isPrefersReducedMotion,
      ref,
      rect,
    }),
    [isSm, isMd, isLg, isXL, isXXL, isPrefersReducedMotion, ref, rect]
  );

  return (
    <MediaQueryContext.Provider value={context}>
      {children}
    </MediaQueryContext.Provider>
  );
}

export const useMediaQueryContext = () => useContext(MediaQueryContext);
