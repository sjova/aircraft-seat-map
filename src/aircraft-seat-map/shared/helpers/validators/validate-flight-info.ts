import { Arrival, Departure, FlightInfo } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { validateObject } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object';

const validateFlightInfoDeparture = (departure: Departure): void => {
  validateObject(departure, 'code', 'string', true);
  validateObject(departure, 'terminalInformation', 'string', true, true);
  validateObject(departure, 'time', 'string', true, true);
};

const validateFlightInfoArrival = (arrival: Arrival): void => {
  validateObject(arrival, 'code', 'string', true);
  validateObject(arrival, 'terminalInformation', 'string', true, true);
  validateObject(arrival, 'time', 'string', true, true);
};

export const validateFlightInfo = (flightInfo: FlightInfo): void => {
  validateObject(flightInfo, 'departure', 'object', true);
  validateFlightInfoDeparture(flightInfo.departure);

  validateObject(flightInfo, 'arrival', 'object', true);
  validateFlightInfoArrival(flightInfo.arrival);

  validateObject(flightInfo, 'marketingCarrier', 'string', true, true);
  validateObject(flightInfo, 'flightNumber', 'string', true, true);
};
