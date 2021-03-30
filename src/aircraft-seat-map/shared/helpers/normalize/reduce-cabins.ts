import { SeatMap } from '@app/aircraft-seat-map/shared/models/flight';
import {
  Cabin,
  Row,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';
import { reduceItems } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-items';

const reduceCabinRows = (seatMap: SeatMap, row: Row): SeatMap => ({
  ...seatMap,
  [row.number]: row.items.reduce(reduceItems, {}),
});

export const reduceCabins = (seatMap: SeatMap, cabin: Cabin): SeatMap => ({
  ...seatMap,
  ...cabin.rows.reduce(reduceCabinRows, {}),
});
