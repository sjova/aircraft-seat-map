import { IsObjectEnumValidFn } from '@app/aircraft-seat-map/shared/helpers/validators/validate-enum-types';

export const validateObjectEnum = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  propName: string,
  isObjectEnumValidFn: IsObjectEnumValidFn
): void => {
  if (Array.isArray(obj[propName])) {
    obj[propName].forEach((arg: string) => {
      if (!isObjectEnumValidFn(arg)) {
        console.error(obj, `${propName} is not valid enum`);
      }
    });
  } else if (!isObjectEnumValidFn(obj[propName])) {
    console.error(obj, `${propName} is not valid enum`);
  }
};
