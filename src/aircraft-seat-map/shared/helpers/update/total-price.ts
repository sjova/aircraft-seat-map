import { Flights, FlightsTotalPrice } from '@app/aircraft-seat-map/models/flights';

/**
 * Total Price From Base Flights
 *
 * @param flights
 */
export const getTotalPrice = (flights: Flights): FlightsTotalPrice => {
  let totalPrice: FlightsTotalPrice = {
    total: 0,
    currencyCode: undefined,
  };

  for (let i = 0; i < flights.allIds.length; i++) {
    const flightNumber = flights.allIds[i];
    const flight = flights.byId[flightNumber];

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
