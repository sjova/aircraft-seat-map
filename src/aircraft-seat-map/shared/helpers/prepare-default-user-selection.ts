import { FlightsState } from '@app/aircraft-seat-map/shared/models/flight-state';
import { UserSelection } from '@app/store';

export const prepareDefaultUserSelection = (
  flightsState: FlightsState
): UserSelection => {
  const [flightNumber] = flightsState.allIds;
  const [passengerId] = flightsState.byId[flightNumber].passengers.allIds;

  return {
    flightNumber,
    passengerId,
  };
};
