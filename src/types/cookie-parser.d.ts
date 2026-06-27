import { RequestHandler } from 'express';

declare module 'cookie-parser' {
  interface CookieParseOptions {
    decode?(val: string): string;
  }

  function cookieParser(
    secret?: string | string[],
    options?: CookieParseOptions,
  ): RequestHandler;

  export default cookieParser;
}
