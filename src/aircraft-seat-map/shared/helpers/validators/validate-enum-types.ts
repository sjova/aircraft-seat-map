export interface IsObjectEnumValidFn {
  (arg: string): boolean;
}

export const isCabinType = (arg: string): boolean => {
  return ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST', 'UNKNOWN'].some((type) => type === arg);
};

export const isCabinDeck = (arg: string): boolean => {
  return ['MAIN', 'UPPER', 'LOWER'].some((type) => type === arg);
};

export const isRowItemType = (arg: string): boolean => {
  return ['SEAT', 'AISLE', 'LAVATORY', 'UNKNOWN'].some((type) => type === arg);
};

export const isRowSeatAvailability = (arg: string): boolean => {
  return ['AVAILABLE', 'UNAVAILABLE', 'OCCUPIED', 'UNKNOWN'].some((type) => type === arg);
};

export const isRowSeatCharacteristic = (arg: string): boolean => {
  return ['BULKHEAD', 'EXTRA_LEG_ROOM', 'EXIT_ROW', 'OVERWING'].some((type) => type === arg);
};

export const isCabinRowTag = (arg: string): boolean => {
  return ['EXIT', 'WING', 'BULKHEAD'].some((type) => type === arg);
};
