/**
 * Title Case
 *
 * @param input
 */
export const titleCase = (input: string): string => {
  return `${input[0].toUpperCase()}${input.substr(1).toLowerCase()}`;
};
