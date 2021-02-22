import {
  FlightInfo,
  Item,
  Passenger,
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
}

export interface SeatMapState {
  [rowNumber: string]: SeatMapCodeState;
}

export interface SeatMapCodeState {
  [code: string]: ItemState;
}

export interface ItemState extends Item {
  flightNumber?: string;
  passengerId?: string;
  selected?: boolean;
}
