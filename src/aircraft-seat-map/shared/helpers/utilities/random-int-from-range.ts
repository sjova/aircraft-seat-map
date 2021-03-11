/**
 * Getting a random integer between two values
 *
 * @param min
 * @param max
 */
export const getRandomIntegerFromRange = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min) + min);
};
