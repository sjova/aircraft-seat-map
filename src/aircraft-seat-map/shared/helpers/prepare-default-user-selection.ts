import { FlightsState } from '@app/aircraft-seat-map/shared/models/flight-state';
import { UserSelection } from '@app/store';

export const prepareDefaultUserSelection = (
  flightsState: FlightsState
): UserSelection => {
  const [flightNumber] = Object.keys(flightsState);
  const [passengerId] = Object.keys(flightsState[flightNumber].passengers);

  return {
    flightNumber,
    passengerId,
  };
};
