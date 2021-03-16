import { FlightsState } from '@app/aircraft-seat-map/shared/models/flight-state';

const passengerSeatSelectionValidation = (
  flights: FlightsState,
  flightNumber: string,
  passengerId: string
): boolean =>
  Boolean(
    flights.byId[flightNumber].passengers.byId[passengerId].seatCode &&
      flights.byId[flightNumber].passengers.byId[passengerId].seatCode
  );

const passengersSeatSelectionValidation = (
  flights: FlightsState,
  flightNumber: string
): boolean =>
  flights.byId[flightNumber].passengers.allIds.every((passengerId) =>
    passengerSeatSelectionValidation(flights, flightNumber, passengerId)
  );

/**
 * Seat Selection Validation From Base Flights State
 *
 * @param flights
 */
export const seatSelectionValidation = (flights: FlightsState): boolean =>
  flights.allIds.every((flightNumber) =>
    passengersSeatSelectionValidation(flights, flightNumber)
  );
