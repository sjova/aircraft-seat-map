import { SeatMapRowItem, Passenger } from '@app/aircraft-seat-map/models/flights';
import { SeatMapSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';

export const getPartialSeat = (
  passenger: Passenger,
  seatSelection: SeatMapSelection
): Pick<SeatMapRowItem, 'selected' | 'flightNumber' | 'passengerId'> => {
  if (passenger.seatRowNumber === seatSelection.seatRowNumber && passenger.seatCode === seatSelection.seatCode) {
    return {
      selected: false,
      flightNumber: undefined,
      passengerId: undefined,
    };
  }
  return {
    selected: true,
    flightNumber: seatSelection.flightNumber,
    passengerId: seatSelection.passengerId,
  };
};
