import {
  FlightInfo,
  Item,
  Offer,
  Passenger,
  Price,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';

export interface FlightsState {
  [flightNumber: string]: FlightState;
}

export interface FlightState {
  flightInfo: FlightInfo;
  passengers: PassengersState;
  seatMap: SeatMapState;
}

export interface PassengersState {
  [passengerId: string]: PassengerState;
}

export interface PassengerState extends Passenger {
  seatRowNumber: string;
  seatCode: string;
  seatOffer: Offer;
}

export interface SeatMapState {
  [rowNumber: string]: SeatMapCodeState;
}

export interface SeatMapCodeState {
  [code: string]: ItemState;
}

export interface OffersState {
  [passengerId: string]: Offer;
}

export interface ItemState extends Omit<Item, 'offers'> {
  flightNumber?: string;
  passengerId?: string;
  selected?: boolean;
  offers?: OffersState;
}

export type FlightsTotalPrice = Pick<Price, 'total' | 'currencyCode'>;
