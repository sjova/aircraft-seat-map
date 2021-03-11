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

  for (let i = 0; i < flightsState.allIds.length; i++) {
    const flightNumber = flightsState.allIds[i];
    const flight = flightsState.byId[flightNumber];

    for (let j = 0; j < flight.passengers.allIds.length; j++) {
      const passengerId = flight.passengers.allIds[j];
      const passenger = flight.passengers.byId[passengerId];

      if (passenger.seatOffer) {
        totalPrice = {
          ...totalPrice,
          total: totalPrice.total + passenger.seatOffer.price.total,
          currencyCode: passenger.seatOffer.price.currencyCode,
        };
      }
    }
  }

  return totalPrice;
};
