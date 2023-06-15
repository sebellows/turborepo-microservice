import { isPlainObject } from "@trms/utils";

export const Breakpoints = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
export type Breakpoint = (typeof Breakpoints)[number];

export type WithBreakpoint<T extends number | string> = Partial<
  Record<Breakpoint, T>
>;

export const isWithBreakpoint = <T extends number | string>(
  value: T | WithBreakpoint<T>
): value is WithBreakpoint<T> => {
  return (
    isPlainObject(value) &&
    Object.keys(value).every((key) => Breakpoints.includes(key as Breakpoint))
  );
};
