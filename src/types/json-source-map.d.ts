/**
 * json-source-map ships no types. Only the parts we use are declared here.
 */
declare module 'json-source-map' {
  interface Location {
    line: number;
    column: number;
    pos: number;
  }

  interface Pointer {
    key?: Location;
    keyEnd?: Location;
    value?: Location;
    valueEnd?: Location;
  }

  interface ParseResult<T = unknown> {
    data: T;
    pointers: Record<string, Pointer>;
  }

  /** Parses JSON and records the source range of every value, keyed by JSON Pointer. */
  export function parse<T = unknown>(source: string): ParseResult<T>;

  export function stringify(
    data: unknown,
    replacer?: unknown,
    space?: string | number,
  ): { json: string; pointers: Record<string, Pointer> };

  const jsonMap: {
    parse: typeof parse;
    stringify: typeof stringify;
  };
  export default jsonMap;
}
