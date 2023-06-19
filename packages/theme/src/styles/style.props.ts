import { StringKeyOf, ValueOf, getKeys, getValues, pick } from "@trms/utils";

import { WithBreakpoint } from "./breakpoints";
import { flexgrid } from "./flexgrid";
import { layout } from "./layout";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { sizing } from "./sizing";
import { borders } from "./borders";
import { shadow } from "./shadow";

/** @internal */
export const UIStyleCategoryMap = {
  borders,
  layout,
  flexgrid,
  shadow,
  sizing,
  spacing,
  typography,
};
export type UIStyleCategoryMap = typeof UIStyleCategoryMap;
export type UIStyleCategory = keyof UIStyleCategoryMap;

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
  ...shadow,
  ...sizing,
  ...spacing,
  ...typography,
};

type UIComponentPropsType = typeof UIComponentProps;
// Key of UIComponentProps: `flex`, `leading`, `alignItems`, etc.
type UIPropertyKey = StringKeyOf<UIComponentPropsType>;
// i.e., key of UIComponentProps.flex: `none`, `1`, `auto`, etc.
type UIPropertyValue<K extends UIPropertyKey> = StringKeyOf<
  UIComponentPropsType[K]
>;

/**
 * @example
 * <h1 fontWeight='thin'>The Title</h1>
 * OR
 * <h1 fontWeight={{ xs: 'extrabold', md: 'heavy', '2xl': 'thin' }}>The Title</h1>
 */
export type UIComponentProps = {
  [K in UIPropertyKey]:  // keyof typeof UIComponentProps (e.g., 'fontWeight')
    | UIPropertyValue<K> // keyof UIComponentPropsType[K] (e.g., 'thin')
    | WithBreakpoint<UIPropertyValue<K>>; // <keyof UIComponentPropsType[K]> (e.g., `{ lg: 'thin' }`)
};
