import {
  ItemState,
  PassengerState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import { SeatSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';

export const getSeatPartialState = (
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
