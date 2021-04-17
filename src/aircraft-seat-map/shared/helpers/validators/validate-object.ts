// eslint-disable-next-line @typescript-eslint/no-explicit-any
const consoleOutput = (obj: Record<string, any>, message: string, optionalParam: boolean): void => {
  if (optionalParam) {
    console.log(obj, message);
  } else {
    console.error(obj, message);
  }
};

export const validateObject = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  propName: string,
  propType: string,
  checkNull: boolean,
  optionalParam = false
): void => {
  if (obj[propName] === undefined) {
    consoleOutput(obj, `${propName} is missing`, optionalParam);
  }

  if (obj[propName] === null) {
    consoleOutput(obj, `${propName} is equal to null`, optionalParam);
  }

  if (obj[propName] !== undefined && obj[propName] !== null && typeof obj[propName] !== propType) {
    consoleOutput(obj, `${propName} has an wrong type`, optionalParam);
  }

  if (propType === 'string') {
    if (obj[propName]?.length === 0) {
      consoleOutput(obj, `${propName} is an empty string`, optionalParam);
    }

    if (obj[propName] === '0') {
      consoleOutput(obj, `${propName} is equal to zero string`, optionalParam);
    }
  }

  if (propType === 'number' && propName !== 'tax' && obj[propName] === 0) {
    consoleOutput(obj, `${propName} is equal to zero`, optionalParam);
  }
};
