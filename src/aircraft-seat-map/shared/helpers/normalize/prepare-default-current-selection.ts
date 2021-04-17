import { CurrentSelection, Flights } from '@app/aircraft-seat-map/models/flights';

/**
 * Prepare Default Current Selection From Flights Base
 *
 * @param flights
 */
export const prepareDefaultCurrentSelection = (flights: Flights): CurrentSelection => {
  const [flightNumber] = flights.allIds;
  const [passengerId] = flights.byId[flightNumber].passengers.allIds;

  return {
    flightNumber,
    passengerId,
  };
};
