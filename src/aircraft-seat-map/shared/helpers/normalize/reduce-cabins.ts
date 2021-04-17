import { SeatMap, SeatMapRow } from '@app/aircraft-seat-map/models/flights';
import { Cabin, Row, RowItem } from '@app/aircraft-seat-map/models/flights-seat-map-api-response';
import { reduceItems } from '@app/aircraft-seat-map/shared/helpers/normalize/reduce-items';

const reduceCabinRows = (seatMap: SeatMap, row: Row): SeatMap => ({
  ...seatMap,
  [row.number]: row.items.reduce(
    (seatMapRow: SeatMapRow, item: RowItem, index: number) => reduceItems(seatMapRow, item, index),
    {}
  ),
});

export const reduceCabins = (seatMap: SeatMap, cabin: Cabin): SeatMap => ({
  ...seatMap,
  ...cabin.rows.reduce((seatMap: SeatMap, row: Row) => reduceCabinRows(seatMap, row), {}),
});
