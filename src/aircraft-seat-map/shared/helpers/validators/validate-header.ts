import { Header } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { validateObject } from '@app/aircraft-seat-map/shared/helpers/validators/validate-object';

export const validateHeader = (header: Header): void => {
  validateObject(header, 'conversationId', 'string', true);
};
