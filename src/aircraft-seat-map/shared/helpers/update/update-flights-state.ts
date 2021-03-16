import { FlightsState } from '@app/aircraft-seat-map/shared/models/flight-state';
import { SeatSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';
import { getSeatPartialState } from '@app/aircraft-seat-map/shared/helpers/update/seat-partial-state';
import { getPassengerPartialState } from '@app/aircraft-seat-map/shared/helpers/update/passenger-partial-state';
import { getTotalPrice } from '@app/aircraft-seat-map/shared/helpers/total-price';
import { seatSelectionValidation } from '@app/aircraft-seat-map/shared/helpers/seat-selection-validation';

export const updateFlightsState = (
  flights: FlightsState,
  seatSelection: SeatSelection
): FlightsState => {
  const flight = flights.byId[seatSelection.flightNumber];

  let passengers = flight.passengers;
  let passenger = flight.passengers.byId[seatSelection.passengerId];
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
    byId: {
      ...passengers.byId,
      [seatSelection.passengerId]: {
        ...passengers.byId[seatSelection.passengerId],
        ...getPassengerPartialState(passenger, seatSelection),
      },
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

  const newStateBase = {
    ...flights,
    byId: {
      ...flights.byId,
      [seatSelection.flightNumber]: {
        ...flights.byId[seatSelection.flightNumber],
        passengers,
        seatMap,
      },
    },
  };

  return {
    ...newStateBase,
    totalPrice: getTotalPrice(newStateBase),
    isSeatSelectionValid: seatSelectionValidation(newStateBase),
  };
};
