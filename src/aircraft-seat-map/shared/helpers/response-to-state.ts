import {
  FlightsState,
  FlightState,
  PassengersState,
  SeatMapCodeState,
  SeatMapState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  Cabin,
  Flight,
  FlightSeatMapApiResponse,
  Item,
  ItemTypeEnum,
  Passenger,
  Row,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';

const titleCase = (input: string): string => {
  return `${input[0].toUpperCase()}${input.substr(1).toLowerCase()}`;
};

const reducePassengers = (
  state: PassengersState,
  passenger: Passenger
): PassengersState => ({
  ...state,
  [passenger.id]: {
    ...passenger,
    firstName: titleCase(passenger.firstName),
    lastName: titleCase(passenger.lastName),
    seatRowNumber: undefined,
    seatCode: undefined,
  },
});

const reduceItemsState = (
  state: SeatMapCodeState,
  item: Item,
  index: number
): SeatMapCodeState => {
  const rowColumnNumber = index + 1;
  const aisleCode = `@${rowColumnNumber}`;

  return {
    ...state,
    [item.type === ItemTypeEnum.Aisle ? `${aisleCode}` : item.code]: {
      ...item,
      flightNumber: undefined,
      passengerId: undefined,
      selected: false,
    },
  };
};

const reduceCabinRowsState = (state: SeatMapState, row: Row): SeatMapState => ({
  ...state,
  [row.number]: row.items.reduce(reduceItemsState, {}),
});

const reduceCabinsState = (
  state: SeatMapState,
  cabin: Cabin
): SeatMapState => ({
  ...state,
  ...cabin.rows.reduce(reduceCabinRowsState, {}),
});

const reduceFlightItem = (item: Flight): FlightState => {
  const flightInfo = { ...item.flightInfo };
  const passengers = item.passengers.reduce(reducePassengers, {});
  const seatMap = item.seatMap.cabins.reduce(reduceCabinsState, {});

  return { flightInfo, passengers, seatMap };
};

const flightsReducer = (state: FlightsState, item: Flight): FlightsState => ({
  ...state,
  [item.flightInfo.flightNumber]: reduceFlightItem(item),
});

export const responseToState = (
  response: FlightSeatMapApiResponse
): FlightsState => response.items.reduce(flightsReducer, {});
