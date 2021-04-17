import { Flights } from '@app/aircraft-seat-map/models/flights';

const passengerSeatSelectionValidation = (flights: Flights, flightNumber: string, passengerId: string): boolean =>
  Boolean(
    flights.byId[flightNumber].passengers.byId[passengerId].seatCode &&
      flights.byId[flightNumber].passengers.byId[passengerId].seatCode
  );

const passengersSeatSelectionValidation = (flights: Flights, flightNumber: string): boolean =>
  flights.byId[flightNumber].passengers.allIds.every((passengerId) =>
    passengerSeatSelectionValidation(flights, flightNumber, passengerId)
  );

/**
 * Seat Selection Validation From Base Flights
 *
 * @param flights
 */
export const seatSelectionValidation = (flights: Flights): boolean =>
  flights.allIds.every((flightNumber) => passengersSeatSelectionValidation(flights, flightNumber));
