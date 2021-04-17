import { Flights, Flight, CurrentSelection, SeatMap, Passengers } from '@app/aircraft-seat-map/models/flights';
import { initialState } from '@app/aircraft-seat-map/shared/helpers/normalize/initial-state';
import { reduceCabins } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-cabins';
import {
  Cabin,
  FlightItem,
  FlightPassenger,
  FlightsSeatMapApiResponse,
} from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { reducePassengers } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-passengers';
import { prepareDefaultCurrentSelection } from '@app/aircraft-seat-map/shared/helpers/normalize/prepare-default-current-selection';

const reduceFlightItem = (item: FlightItem): Flight => {
  const flightInfo = { ...item.flightInfo };
  const passengers = item.passengers.reduce(
    (passengers: Passengers, passenger: FlightPassenger) => reducePassengers(passengers, passenger),
    initialState
  );
  const seatMap = item.seatMap.cabins.reduce((seatMap: SeatMap, cabin: Cabin) => reduceCabins(seatMap, cabin), {});

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

export const normalizeResponse = (response: FlightsSeatMapApiResponse): Flights => {
  const flights: Flights = response.items.reduce(
    (flights: Flights, item: FlightItem) => flightsReducer(flights, item),
    initialState
  );
  const currentSelection: CurrentSelection = prepareDefaultCurrentSelection(flights);

  return {
    ...flights,
    currentSelection,
  };
};
