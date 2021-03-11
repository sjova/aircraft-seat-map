import { PassengersState } from '@app/aircraft-seat-map/shared/models/flight-state';
import { Passenger } from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';
import { titleCase } from '@app/aircraft-seat-map/shared/helpers/utilities';

export const reducePassengers = (
  state: PassengersState,
  passenger: Passenger
): PassengersState => ({
  ...state,
  byId: {
    ...state.byId,
    [passenger.id]: {
      ...passenger,
      firstName: titleCase(passenger.firstName),
      lastName: titleCase(passenger.lastName),
      seatRowNumber: undefined,
      seatCode: undefined,
      seatOffer: undefined,
    },
  },
  // TODO: Revisit Passenger ID conversion `number` to `string` after migration to our DIB API
  allIds: [...state.allIds, `${passenger.id}`],
});
