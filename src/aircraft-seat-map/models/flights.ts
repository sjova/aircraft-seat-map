import {
  FlightInfo,
  RowItem,
  Offer,
  FlightPassenger,
  Price,
} from '@app/aircraft-seat-map/models/flights-seat-map-api-response';

export interface Flights {
  allIds: string[];
  byId: FlightsById;
  currentSelection: CurrentSelection;
  isSeatSelectionValid: boolean;
  totalPrice: FlightsTotalPrice;
}

export interface FlightsById {
  [flightNumber: string]: Flight;
}

export interface Flight {
  flightInfo: FlightInfo;
  passengers: Passengers;
  seatMap: SeatMap;
}

export interface Passengers {
  byId: PassengersById;
  allIds: string[];
}

export interface PassengersById {
  [passengerId: string]: Passenger;
}

export interface Passenger extends FlightPassenger {
  seatRowNumber: string;
  seatCode: string;
  seatOffer: Offer;
}

export interface SeatMap {
  [rowNumber: string]: SeatMapRow;
}

export interface SeatMapRow {
  [code: string]: SeatMapRowItem;
}

export interface SeatMapRowItem extends Omit<RowItem, 'offers'> {
  flightNumber?: string;
  passengerId?: string;
  selected?: boolean;
  offers?: Offers;
}

export interface Offers {
  [passengerId: string]: Offer;
}

export interface CurrentSelection {
  flightNumber: string;
  passengerId: string;
}

export type FlightsTotalPrice = Pick<Price, 'total' | 'currencyCode'>;
