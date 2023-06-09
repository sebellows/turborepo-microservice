export const Breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export type Breakpoint = (typeof Breakpoints)[number]

export type WithBreakpoint<T> = Record<Breakpoint, T>
