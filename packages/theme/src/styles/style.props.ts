import { ValueOf } from "@trms/utils";

import { WithBreakpoint } from "./breakpoints";
import { flexgrid } from "./flexgrid";
import { layout } from "./layout";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { sizing } from "./sizing";
import { borders } from "./borders";
import { shadow } from "./shadow";

/** @internal */
export const UIPropsToClassMap = {
  borders,
  layout,
  flexgrid,
  shadow,
  sizing,
  spacing,
  typography,
};

/**
 * UIComponentProps Breakdown:
 * {
 *     <UIPropertyKey: custom property name>
 *          ⏐
 *     ⎾‾‾‾‾‾‾‾‾⏋
 *     fontFamily: {
 *         <UIPropertyValue<'fontFamily'>: Tailwind class suffix>
 *           ⏐
 *        ⎾‾‾‾⏋
 *         sans: 'font-sans'
 *              ⎿_________⏌
 *                   ⏐
 *                <UIPropertyClass<'fontFamily', 'sans'>: Tailwind class>
 *     },
 *     py: {
 *         '4': 'py-4',
 *         '6': 'py-6',
 *         \// etc.
 *     }
 * }
 */
export const UIComponentProps = {
  ...borders,
  ...layout,
  ...flexgrid,
  shadow,
  ...sizing,
  ...spacing,
  ...typography,
};

type UIComponentPropsType = typeof UIComponentProps;
// Key of UIComponentProps: `flex`, `leading`, `alignItems`, etc.
type UIPropertyKey = keyof UIComponentPropsType;
// i.e., key of UIComponentProps.flex: `none`, `1`, `auto`, etc.
type UIPropertyValue<K extends UIPropertyKey> = keyof UIComponentPropsType[K];
// i.e., `flex-none`, `flex-1`, etc.
export type UIPropertyClass<
  K extends UIPropertyKey,
  K2 extends keyof UIComponentPropsType[K] = keyof UIComponentPropsType[K]
> = ValueOf<UIComponentPropsType[K], K2>;

/**
 * @example
 * <h1 fontWeight='thin'>The Title</h1>
 * OR
 * <h1 fontWeight={{ xs: 'extrabold', md: 'heavy', '2xl': 'thin' }}>The Title</h1>
 */
export type UIComponentProps = {
  [K in UIPropertyKey]:  // keyof typeof UIComponentProps (e.g., 'fontWeight')
    | UIPropertyValue<K> // keyof UIComponentPropsType[K] (e.g., 'thin')
    | WithBreakpoint<Exclude<UIPropertyValue<K>, symbol>>; // <keyof UIComponentPropsType[K]> (e.g., `{ lg: 'thin' }`)
};
