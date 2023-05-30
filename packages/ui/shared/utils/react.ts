import { ElementType, forwardRef } from "react";
import { AsProp, ReplaceProps } from "../types";

export const forwardRefAs = <
  As extends ElementType,
  P,
  El = As extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[As]
    : As extends new (...args: any) => any
    ? InstanceType<As>
    : undefined,
  RProps = AsProp<As, P> // Omit<React.PropsWithoutRef<As>, "as" | keyof P> // React.PropsWithoutRef<P> & React.RefAttributes<El>
>(
  render: React.ForwardRefRenderFunction<El, RProps>
) => {
  return forwardRef<El, RProps>(render);
};
