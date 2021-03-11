import { SeatMapState } from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  Cabin,
  Row,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';
import { reduceItemsState } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-items';

const reduceCabinRowsState = (state: SeatMapState, row: Row): SeatMapState => ({
  ...state,
  [row.number]: row.items.reduce(reduceItemsState, {}),
});

export const reduceCabinsState = (
  state: SeatMapState,
  cabin: Cabin
): SeatMapState => ({
  ...state,
  ...cabin.rows.reduce(reduceCabinRowsState, {}),
});
