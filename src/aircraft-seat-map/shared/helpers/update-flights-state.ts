import {
  FlightsState,
  ItemState,
  PassengerState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import { SeatSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';

const getSeatPartialState = (
  passenger: PassengerState,
  seatSelection: SeatSelection
): Pick<ItemState, 'selected' | 'flightNumber' | 'passengerId'> => {
  if (
    passenger.seatRowNumber === seatSelection.seatRowNumber &&
    passenger.seatCode === seatSelection.seatCode
  ) {
    return {
      selected: false,
      flightNumber: undefined,
      passengerId: undefined,
    };
  } else {
    return {
      selected: true,
      flightNumber: seatSelection.flightNumber,
      passengerId: seatSelection.passengerId,
    };
  }
};

const getPassengerPartialState = (
  passenger: PassengerState,
  seatSelection: SeatSelection
): Pick<PassengerState, 'seatRowNumber' | 'seatCode'> => {
  if (
    passenger.seatRowNumber === seatSelection.seatRowNumber &&
    passenger.seatCode === seatSelection.seatCode
  ) {
    return {
      seatRowNumber: undefined,
      seatCode: undefined,
    };
  } else {
    return {
      seatRowNumber: seatSelection.seatRowNumber,
      seatCode: seatSelection.seatCode,
    };
  }
};

export const updateFlightsState = (
  flights: FlightsState,
  seatSelection: SeatSelection
): FlightsState => {
  const flight = flights[seatSelection.flightNumber];

  let passengers = flight.passengers;
  let passenger = flight.passengers[seatSelection.passengerId];
  let seatMap = flight.seatMap;

  // Remove previous seat selection from `seatMap`
  if (passenger.seatRowNumber && passenger.seatCode) {
    seatMap = {
      ...seatMap,
      [passenger.seatRowNumber]: {
        ...seatMap[passenger.seatRowNumber],
        [passenger.seatCode]: {
          ...seatMap[passenger.seatRowNumber][passenger.seatCode],
          selected: false,
          flightNumber: undefined,
          passengerId: undefined,
        },
      },
    };
  }

  // Add seat selection in `passengers`
  passengers = {
    ...passengers,
    [seatSelection.passengerId]: {
      ...passengers[seatSelection.passengerId],
      ...getPassengerPartialState(passenger, seatSelection),
    },
  };

  // Add seat selection in `seatMap`
  seatMap = {
    ...seatMap,
    [seatSelection.seatRowNumber]: {
      ...seatMap[seatSelection.seatRowNumber],
      [seatSelection.seatCode]: {
        ...seatMap[seatSelection.seatRowNumber][seatSelection.seatCode],
        ...getSeatPartialState(passenger, seatSelection),
      },
    },
  };

  return {
    ...flights,
    [seatSelection.flightNumber]: {
      ...flights[seatSelection.flightNumber],
      passengers,
      seatMap,
    },
  };
};
