export class InternalError extends Error {
  code: string;

  constructor(code: string, message: string, stack?: string) {
    super(message);
    this.code = code;
    if (stack) {
      this.stack = stack;
    }
  }

}
