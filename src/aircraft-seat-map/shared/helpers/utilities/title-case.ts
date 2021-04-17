/**
 * Title Case single word
 *
 * Included case with dash
 *
 * Examples: `example -> Example`, `EXAMPLE-EXAMPLE -> Example-Example`
 *
 * @param word
 */
export const titleCase = (word: string): string => {
  return word
    .split('-')
    .map((wordPart: string) => wordPart[0].toUpperCase() + wordPart.slice(1).toLowerCase())
    .join('-');
};
