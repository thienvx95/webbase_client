export const stringFormat = (str: string, ...args: string[]): string =>
  str.replace(/{(\d+)}/g, (_match, index) => args[index] || '');
