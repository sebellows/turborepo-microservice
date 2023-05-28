import { ElementType } from "react";

/**
 * Simple switch to return a child tag from a parent tag argument.
 * Returns a div by default.
 */
export const getChildTag = (parentTag?: ElementType<any>) => {
  switch (parentTag) {
    case "ul":
    case "ol":
      return "li";
    default:
      return "div";
  }
};

/** Reluctant trick for fixing TypeScript inference issues around dynamic types. */
export function identityType<T>() {
  function inner<U extends T>(u: U): U {
    return u;
  }
  return inner;
}

/**
 * Bidirectional display support.
 * Applies to following CSS properties:
 * - border-block-start/border-block-end
 * - border-block-start-(color|style|width)/border-block-end-(color|style|width)
 * - grid-column-*
 * - grid-row-*
 * - margin-block/margin-block-*
 * - margin-inline/margin-inline-*
 * - padding-block/padding-block-*
 * - padding-inline/padding-inline-*
 * - inset-block/inset-block-*
 * - inset-inline/inset-inline-*
 */
export function getBidiSuffix(placement: string, isRTL?: boolean) {
  let direction = placement;
  if (placement === "left") {
    direction = isRTL ? "end" : "start";
  } else if (placement === "right") {
    direction = isRTL ? "start" : "end";
  }

  return direction;
}

/** A logger for dev environment-only logging. */
class DevLogger {
  static instance: DevLogger;

  readonly isDev = process.env.NODE_ENV !== "production";
  readonly logger: Console;

  private constructor(logger = console) {
    this.logger = logger;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new DevLogger();
    }

    return this.instance;
  }

  log(condition: boolean, ...messages: any[]): void {
    if (this.isDev && condition) {
      this.logger.log(...messages);
    }
  }

  error(condition: boolean, ...messages: any[]): void {
    if (this.isDev && condition) {
      this.logger.error(...messages);
    }
  }

  info(condition: boolean, ...messages: any[]): void {
    if (this.isDev && condition) {
      this.logger.info(...messages);
    }
  }

  warn(condition: boolean, ...messages: any[]): void {
    if (this.isDev && condition) {
      this.logger.warn(...messages);
    }
  }
}

export const devLogger = DevLogger.getInstance();
