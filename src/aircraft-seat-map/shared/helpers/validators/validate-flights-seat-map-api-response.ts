import { FlightsSeatMapApiResponse } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { validatePassenger } from '@app/aircraft-seat-map/shared/helpers/validators/validate-passenger';
import { validateObject } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object';
import { validateCabin } from '@app/aircraft-seat-map/shared/helpers/validators/validate-cabin';
import { validateCabinRow } from '@app/aircraft-seat-map/shared/helpers/validators/validate-cabin-row';
import { validateFlightInfo } from '@app/aircraft-seat-map/shared/helpers/validators/validate-flight-info';
import { validateRowItem } from '@app/aircraft-seat-map/shared/helpers/validators/validate-row-item';

/**
 * TODO: This will be used after integration with DIB API
 */
export const validateFlightsSeatMapApiResponse = (response: FlightsSeatMapApiResponse): void => {
  validateObject(response, 'conversationId', 'string', true);

  // eslint-disable-next-line no-restricted-syntax
  for (const item of response.items) {
    validateFlightInfo(item.flightInfo);

    // eslint-disable-next-line no-restricted-syntax
    for (const passenger of item.passengers) {
      validatePassenger(passenger);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cabin of item.seatMap.cabins) {
      validateCabin(cabin);

      // eslint-disable-next-line no-restricted-syntax
      for (const cabinRow of cabin.rows) {
        validateCabinRow(cabinRow);

        // eslint-disable-next-line no-restricted-syntax
        for (const rowItem of cabinRow.items) {
          validateRowItem(rowItem);
        }
      }
    }
  }
};
