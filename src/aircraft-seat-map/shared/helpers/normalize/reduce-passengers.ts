import { Passengers } from '@app/aircraft-seat-map/models/flights';
import { FlightPassenger } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { titleCase } from '@app/aircraft-seat-map/shared/helpers/utilities';

export const reducePassengers = (passengers: Passengers, passenger: FlightPassenger): Passengers => ({
  ...passengers,
  byId: {
    ...passengers.byId,
    [passenger.id]: {
      ...passenger,
      firstName: titleCase(passenger.firstName),
      lastName: titleCase(passenger.lastName),
      seatRowNumber: undefined,
      seatCode: undefined,
      seatOffer: undefined,
    },
  },
  // TODO: Revisit Passenger ID conversion `number` to `string` after migration to DIB API
  allIds: [...passengers.allIds, `${passenger.id}`],
});
