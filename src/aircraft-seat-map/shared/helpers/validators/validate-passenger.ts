import { FlightPassenger } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { validateObject } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object';

export const validatePassenger = (passenger: FlightPassenger): void => {
  validateObject(passenger, 'id', 'string', true);

  validateObject(passenger, 'firstName', 'string', true);
  validateObject(passenger, 'lastName', 'string', true);
  validateObject(passenger, 'gender', 'string', true, true);
  validateObject(passenger, 'title', 'string', true, true);
  validateObject(passenger, 'type', 'string', true, true);
  validateObject(passenger, 'dateOfBirth', 'string', true, true);
  validateObject(passenger, 'email', 'string', true);
};
