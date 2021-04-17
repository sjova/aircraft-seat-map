import { Offers, SeatMapRow } from '@app/aircraft-seat-map/models/flights';
import { RowItem, RowItemTypeEnum, Offer } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';

const reduceItemOffers = (offers: Offers, offer: Offer): Offers => {
  return {
    ...offers,
    [offer.passengerId]: offer,
  };
};

export const reduceItems = (seatMapRow: SeatMapRow, item: RowItem, index: number): SeatMapRow => {
  const rowColumnNumber = index + 1;
  const aisleCode = `@${rowColumnNumber}`;

  return {
    ...seatMapRow,
    [item.type === RowItemTypeEnum.Aisle ? `${aisleCode}` : item.code]: {
      ...item,
      flightNumber: undefined,
      passengerId: undefined,
      selected: false,
      offers: item.offers
        ? item.offers.reduce((offers: Offers, offer: Offer) => reduceItemOffers(offers, offer), {})
        : undefined,
    },
  };
};
