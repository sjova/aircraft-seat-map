import { FlightsState } from '@app/aircraft-seat-map/shared/models/flight-state';

const passengerSeatSelectionValidation = (
  flights: FlightsState,
  flightNumber: string,
  passengerId: string
): boolean =>
  Boolean(
    flights[flightNumber].passengers[passengerId].seatCode &&
      flights[flightNumber].passengers[passengerId].seatCode
  );

const passengersSeatSelectionValidation = (
  flights: FlightsState,
  flightNumber: string
) =>
  Object.keys(flights[flightNumber].passengers).every((passengerId) =>
    passengerSeatSelectionValidation(flights, flightNumber, passengerId)
  );

export const seatSelectionValidation = (flights: FlightsState) =>
  Object.keys(flights).every((flightNumber) =>
    passengersSeatSelectionValidation(flights, flightNumber)
  );
