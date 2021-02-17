export interface FlightDetails {
  passenger: Passenger;
  flights: Flight[];
}

export interface Flight {
  flightInfo: FlightInfo;
  flightSeat: FlightSeat;
}

export interface FlightInfo {
  departure: Departure;
  arrival: Arrival;
}

export interface Departure {
  code: string;
}

export interface Arrival {
  code: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
}

export interface FlightSeat {
  code: string;
  rowNumber: number;
}
