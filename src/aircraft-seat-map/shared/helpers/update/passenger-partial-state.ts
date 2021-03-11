import { PassengerState } from '@app/aircraft-seat-map/shared/models/flight-state';
import { SeatSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';

export const getPassengerPartialState = (
  passenger: PassengerState,
  seatSelection: SeatSelection
): Pick<PassengerState, 'seatRowNumber' | 'seatCode' | 'seatOffer'> => {
  if (
    passenger.seatRowNumber === seatSelection.seatRowNumber &&
    passenger.seatCode === seatSelection.seatCode
  ) {
    return {
      seatRowNumber: undefined,
      seatCode: undefined,
      seatOffer: undefined,
    };
  } else {
    return {
      seatRowNumber: seatSelection.seatRowNumber,
      seatCode: seatSelection.seatCode,
      seatOffer: seatSelection.seatOffer,
    };
  }
};
