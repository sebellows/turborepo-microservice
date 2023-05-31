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
