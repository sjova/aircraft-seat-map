import {
  RowItem,
  RowItemTypeEnum,
  RowSeatAvailabilityEnum,
} from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import {
  isRowItemType,
  isRowSeatAvailability,
  isRowSeatCharacteristic,
} from '@app/aircraft-seat-map/shared/helpers/validators/validate-enum-types';
import { validateObjectEnum } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object-enum';
import { validateOffer } from '@app/aircraft-seat-map/shared/helpers/validators/validate-offer';
import { validateObject } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object';

export const validateRowItem = (rowItem: RowItem): void => {
  validateObject(rowItem, 'type', 'string', true);
  validateObjectEnum(rowItem, 'type', isRowItemType);

  validateObject(rowItem, 'rowNumber', 'string', true);

  if (rowItem.type === RowItemTypeEnum.Seat) {
    validateObject(rowItem, 'code', 'string', true);

    validateObject(rowItem, 'availability', 'string', true);
    validateObjectEnum(rowItem, 'availability', isRowSeatAvailability);

    validateObject(rowItem, 'characteristics', 'object', true);
    validateObjectEnum(rowItem, 'characteristics', isRowSeatCharacteristic);

    if (rowItem.availability === RowSeatAvailabilityEnum.Available) {
      validateObject(rowItem, 'offers', 'object', true);

      if (rowItem.offers) {
        for (const offer of rowItem.offers) {
          validateOffer(offer);
        }
      }
    }
  }
};
