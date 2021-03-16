import {
  FlightsState,
  FlightState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  Flight,
  FlightSeatMapApiResponse,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';
import { reducePassengers } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-passengers';
import { reduceCabinsState } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-cabins';
import { initialState } from '@app/aircraft-seat-map/shared/helpers/normalize/initial-state';

const reduceFlightItem = (item: Flight): FlightState => {
  const flightInfo = { ...item.flightInfo };
  const passengers = item.passengers.reduce(reducePassengers, initialState);
  const seatMap = item.seatMap.cabins.reduce(reduceCabinsState, {});

  return { flightInfo, passengers, seatMap };
};

const flightsReducer = (state: FlightsState, item: Flight): FlightsState => ({
  ...state,
  byId: {
    ...state.byId,
    [item.flightInfo.flightNumber]: reduceFlightItem(item),
  },
  allIds: [...state.allIds, item.flightInfo.flightNumber],
});

export const responseToState = (
  response: FlightSeatMapApiResponse
): FlightsState => response.items.reduce(flightsReducer, initialState);
