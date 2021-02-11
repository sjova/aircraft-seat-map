export interface FlightSeatMapResponse {
  header: FSMHeader;
  items: FSMItem[];
}

export interface FSMHeader {
  conversationId: string;
}

export interface FSMItem {
  flightInfo: FSMFlightInfo;
  passengers: FSMPassenger[];
  seatMap: FlightSeatMap;
}

export interface FSMFlightInfo {
  departure: FSMDeparture;
  arrival: FSMArrival;
  marketingCarrier: string;
  flightNumber: string;
}

export interface FSMDeparture {
  code: string;
  at: string;
}

export interface FSMArrival {
  code: string;
}

export interface FSMPassenger {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
}

export interface FlightSeatMap {
  cabins: FSMCabin[];
}

export interface FSMCabin {
  type: string;
  deck: string;
  rows: FSMRow[];
}

export interface FSMRow {
  number: number;
  items: FSMSeat[];
  tags?: string[];
}

export interface FSMSeat {
  type: string;
  code?: string;
  rowNumber: number;
  availability?: string;
  characteristics?: string[];
}
