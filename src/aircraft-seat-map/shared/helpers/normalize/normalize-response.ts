import {
  Flights,
  Flight,
  CurrentSelection,
} from '@app/aircraft-seat-map/shared/models/flight';
import { initialState } from '@app/aircraft-seat-map/shared/helpers/normalize/initial-state';
import { reduceCabins } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-cabins';
import {
  FlightItem,
  FlightSeatMapApiResponse,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';
import { reducePassengers } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-passengers';
import { prepareDefaultCurrentSelection } from '@app/aircraft-seat-map/shared/helpers/normalize/prepare-default-current-selection';

const reduceFlightItem = (item: FlightItem): Flight => {
  const flightInfo = { ...item.flightInfo };
  const passengers = item.passengers.reduce(reducePassengers, initialState);
  const seatMap = item.seatMap.cabins.reduce(reduceCabins, {});

  return { flightInfo, passengers, seatMap };
};

const flightsReducer = (flights: Flights, item: FlightItem): Flights => ({
  ...flights,
  byId: {
    ...flights.byId,
    [item.flightInfo.flightNumber]: reduceFlightItem(item),
  },
  allIds: [...flights.allIds, item.flightInfo.flightNumber],
});

export const normalizeResponse = (
  response: FlightSeatMapApiResponse
): Flights => {
  const flights: Flights = response.items.reduce(flightsReducer, initialState);
  const currentSelection: CurrentSelection = prepareDefaultCurrentSelection(
    flights
  );

  const updatedFlights = {
    ...flights,
    currentSelection,
  };

  return updatedFlights;
};
