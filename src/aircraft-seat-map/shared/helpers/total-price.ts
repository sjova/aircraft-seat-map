import {
  FlightsState,
  FlightsTotalPrice,
} from '@app/aircraft-seat-map/shared/models/flight-state';

export const getTotalPrice = (
  flightsState: FlightsState
): FlightsTotalPrice => {
  let totalPrice: FlightsTotalPrice = {
    total: 0,
    currencyCode: undefined,
  };

  // TODO: Revisit this later
  Object.keys(flightsState).forEach((flightNumber: string) => {
    Object.keys(flightsState[flightNumber].passengers).forEach(
      (passengerId: string) => {
        const passenger = flightsState[flightNumber].passengers[passengerId];

        if (passenger.seatOffer) {
          totalPrice = {
            ...totalPrice,
            total: totalPrice.total + passenger.seatOffer.price.total,
            currencyCode: passenger.seatOffer.price.currencyCode,
          };
        }
      }
    );
  });

  return totalPrice;
};
