import { Cabin } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { validateObjectEnum } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object-enum';
import { isCabinDeck, isCabinType } from '@app/aircraft-seat-map/shared/helpers/validators/validate-enum-types';

export const validateCabin = (cabin: Cabin): void => {
  validateObjectEnum(cabin, 'type', isCabinType);
  validateObjectEnum(cabin, 'deck', isCabinDeck);
};
