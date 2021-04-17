import { Flights } from '@app/aircraft-seat-map/models/flights';
import { SeatMapSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';
import { getPartialSeat } from '@app/aircraft-seat-map/shared/helpers/update/partial-seat';
import { getPartialPassenger } from '@app/aircraft-seat-map/shared/helpers/update/partial-passenger';
import { getTotalPrice } from '@app/aircraft-seat-map/shared/helpers/update/total-price';
import { seatSelectionValidation } from '@app/aircraft-seat-map/shared/helpers/update/seat-selection-validation';

export const updateFlightsSeatSelection = (flights: Flights, seatSelection: SeatMapSelection): Flights => {
  const flight = flights.byId[seatSelection.flightNumber];

  let passengers = flight.passengers;
  const passenger = flight.passengers.byId[seatSelection.passengerId];
  let seatMap = flight.seatMap;

  // Remove previous seat selection from Seat Map
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
        ...getPartialPassenger(passenger, seatSelection),
      },
    },
  };

  // Add seat selection in Seat Map
  seatMap = {
    ...seatMap,
    [seatSelection.seatRowNumber]: {
      ...seatMap[seatSelection.seatRowNumber],
      [seatSelection.seatCode]: {
        ...seatMap[seatSelection.seatRowNumber][seatSelection.seatCode],
        ...getPartialSeat(passenger, seatSelection),
      },
    },
  };

  const newFlightsBase = {
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
    ...newFlightsBase,
    totalPrice: getTotalPrice(newFlightsBase),
    isSeatSelectionValid: seatSelectionValidation(newFlightsBase),
  };
};
