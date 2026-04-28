declare module 'node:url' {
  export class URL {
    constructor(input: string, base?: string | URL);
    href: string;
  }

  export function fileURLToPath(url: string | URL): string;
}
