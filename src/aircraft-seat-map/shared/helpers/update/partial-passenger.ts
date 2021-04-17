import { Passenger } from '@app/aircraft-seat-map/models/flights';
import { SeatMapSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';

export const getPartialPassenger = (
  passenger: Passenger,
  seatSelection: SeatMapSelection
): Pick<Passenger, 'seatRowNumber' | 'seatCode' | 'seatOffer'> => {
  if (passenger.seatRowNumber === seatSelection.seatRowNumber && passenger.seatCode === seatSelection.seatCode) {
    return {
      seatRowNumber: undefined,
      seatCode: undefined,
      seatOffer: undefined,
    };
  }
  return {
    seatRowNumber: seatSelection.seatRowNumber,
    seatCode: seatSelection.seatCode,
    seatOffer: seatSelection.seatOffer,
  };
};
