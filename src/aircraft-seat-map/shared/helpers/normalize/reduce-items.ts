import {
  OffersState,
  SeatMapCodeState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  Item,
  ItemTypeEnum,
  Offer,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';

const reduceItemOffersState = (
  state: OffersState,
  offer: Offer
): OffersState => {
  return {
    ...state,
    [offer.passengerId]: offer,
  };
};

export const reduceItemsState = (
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
      offers: item.offers
        ? item.offers.reduce(reduceItemOffersState, {})
        : undefined,
    },
  };
};
