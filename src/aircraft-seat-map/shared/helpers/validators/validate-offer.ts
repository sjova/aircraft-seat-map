import { Offer, Price } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { validateObject } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object';

const validateOfferPrice = (price: Price): void => {
  validateObject(price, 'baseFare', 'number', true);
  validateObject(price, 'tax', 'number', true, true);
  validateObject(price, 'total', 'number', true);
  validateObject(price, 'currencyCode', 'string', true);
};

export const validateOffer = (offer: Offer): void => {
  validateObject(offer, 'rateKey', 'string', true);
  validateObject(offer, 'passengerId', 'string', true);
  validateObject(offer, 'price', 'object', true);

  validateOfferPrice(offer.price);
};
