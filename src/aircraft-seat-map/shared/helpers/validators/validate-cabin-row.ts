import { Row } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { validateObjectEnum } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object-enum';
import { isCabinRowTag } from '@app/aircraft-seat-map/shared/helpers/validators/validate-enum-types';

export const validateCabinRow = (cabinRow: Row): void => {
  if (cabinRow.tags) {
    validateObjectEnum(cabinRow, 'tags', isCabinRowTag);
  }
};
