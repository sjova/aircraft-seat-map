export interface FlightsSeatMapApiResponse {
  header: Header;
  items: FlightItem[];
}

export interface Header {
  conversationId: string;
}

export interface FlightItem {
  flightInfo: FlightInfo;
  passengers: FlightPassenger[];
  seatMap: SeatMap;
}

export interface FlightInfo {
  departure: Departure;
  arrival: Arrival;
  marketingCarrier: string;
  flightNumber: string;
}

export interface Departure {
  code: string;
  at: string;
}

export interface Arrival {
  code: string;
}

export interface FlightPassenger {
  id: number;
  firstName: string;
  lastName: string;
  type: string;
}

export interface SeatMap {
  cabins: Cabin[];
}

export interface Cabin {
  type: CabinType;
  deck: CabinDeck;
  rows: Row[];
}

export type CabinType = 'Economy' | 'PremiumEconomy' | 'Business' | 'First' | 'Unknown';

export type CabinDeck = 'Main' | 'Upper' | 'Lower';

export interface Row {
  number: number;
  items: RowItem[];
  tags?: RowTag[];
}

export interface RowItem {
  type: RowItemType;
  code?: string;
  rowNumber: number;
  availability?: RowSeatAvailability;
  characteristics?: RowSeatCharacteristic[];
  offers?: Offer[];
}

export type RowItemType = 'Seat' | 'Aisle' | 'Lavatory' | 'Unknown';

export enum RowItemTypeEnum {
  Seat = 'Seat',
  Aisle = 'Aisle',
  // Lavatory = 'Lavatory', // TODO: Revisit this later
  // Unknown = 'Unknown', // TODO: Revisit this later
}

export type RowSeatAvailability = 'Available' | 'Unavailable' | 'Occupied' | 'Unknown';

export enum RowSeatAvailabilityEnum {
  Available = 'Available',
  Unavailable = 'Unavailable',
  NotAvailable = 'NotAvailable',
  Occupied = 'Occupied',
  Unknown = 'Unknown',
}

export type RowSeatCharacteristic =
  | '1' // Restricted seat - General"
  | '2' // Leg rest available"
  | '3' // Individual video screen - Choice of movies"
  | '4' // Not a window seat"
  | '5' // Not an aisle seat"
  | '6' // Near galley seat"
  | '7' // Near toilet seat"
  | '8' // No seat at this location"
  | '9' // Center seat (not window, not aisle)"
  | '10' // Seat designated for RBD 'A'"
  | '11' // Seat designated for RBD 'B'"
  | '12' // Seat designated for RBD 'C'"
  | '13' // Seat designated for RBD 'D'"
  | '14' // Seat designated for RBD 'F'"
  | '15' // Seat designated for RBD 'H'"
  | '16' // Seat designated for RBD 'J'"
  | '17' // Seat designated for RBD 'K'"
  | '18' // Seat designated for RBD 'L'"
  | '19' // Seat designated for RBD 'M'"
  | '20' // Seat designated for RBD 'P'"
  | '21' // Seat designated for RBD 'Q'"
  | '22' // Seat designated for RBD 'R'"
  | '23' // Seat designated for RBD 'S'"
  | '24' // Seat designated for RBD 'T'"
  | '25' // Seat designated for RBD 'V'"
  | '26' // Seat designated for RBD 'W'"
  | '27' // Seat designated for RBD 'Y'"
  | '700' // Individual video screen - services unspecified"
  | '701' // No seat - access to handicapped lavatory"
  | '1A' // Seat not allowed for infant"
  | '1B' // Seat not allowed for medical"
  | '1C' // Seat not allowed for unaccompanied minor"
  | '1D' // Restricted recline seat"
  | '1M' // Seat with movie view"
  | '1W' // Window seat without window"
  | '3A' // Individual video screen - No choice of movie"
  | '3B' // Individual video screen - Choice of movies, games, information, etc"
  | '6A' // In front of galley seat"
  | '6B' // Behind galley seat"
  | '7A' // In front of toilet seat"
  | '7B' // Behind toilet seat"
  | 'A' // Aisle seat"
  | 'AA' // All available aisle seats"
  | 'AB' // Seat adjacent to bar"
  | 'AC' // Seat adjacent to closet"
  | 'AG' // Seat adjacent to galley"
  | 'AJ' // Adjacent aisle seats"
  | 'AL' // Seat adjacent to lavatory"
  | 'AM' // Individual movie screen - No choice of movie selection"
  | 'AR' // No seat - airphone"
  | 'AS' // Individual airphone"
  | 'AT' // Seat adjacent to table"
  | 'AU' // Seat adjacent to stairs to upper deck"
  | 'AV' // Only available seats"
  | 'AW' // All available window seats"
  | 'B' // Seat with bassinet facility"
  | 'BA' // No seat - bar"
  | 'BK' // Blocked Seat for preferred passenger in adjacent seat"
  | 'C' // Crew seat"
  | 'CC' // Center section seat(s)"
  | 'CH' // Chargeable seat"
  | 'CL' // No seat - closet"
  | 'CS' // Conditional seat - contact airline"
  | 'D' // No seat - exit door"
  | 'DE' // Deportee"
  | 'E' // Exit row seat"
  | 'EA' // Not an exit seat"
  | 'EC' // Electronic connection for lap top or FAX machine"
  | 'EK' // Economy comfort seat"
  | 'EX' // No seat - emergency Exit"
  | 'F' // Added seat"
  | 'FC' // Front of cabin class/compartment"
  | 'G' // Seat at forward end of cabin"
  | 'GF' // General facility"
  | 'GN' // No seat - galley"
  | 'GR' // Group seat - offered to travellers belonging to a group"
  | 'H' // Seat with facilities for handicapped/incapacitated passenger"
  | 'I' // Seat suitable for adult with an infant"
  | 'IA' // Inside aisle seats"
  | 'IE' // Seat not suitable for child"
  | 'J' // Rear facing seat"
  | 'K' // Bulkhead seat"
  | 'KA' // Bulkhead seat with movie screen"
  | 'KN' // Bulkhead, no seat"
  | 'L' // Leg space seat"
  | 'LA' // No seat - lavatory"
  | 'LG' // No seat - luggage storage"
  | 'LH' // Restricted seat - offered on long-haul segments"
  | 'LS' // Left side of aircraft"
  | 'M' // Seat without a movie view"
  | 'MA' // Medically OK to travel"
  | 'N' // No smoking seat"
  | 'O' // Preferential seat"
  | 'OW' // Overwing seat(s)"
  | 'PC' // Pet cabin"
  | 'Q' // Seat in a quiet zone"
  | 'RS' // Right side of aircraft"
  | 'S' // Smoking seat"
  | 'SO' // No seat - storage space"
  | 'ST' // No seat - stairs to upper deck"
  | 'T' // Rear/Tail section of aircraft"
  | 'TA' // No seat - table"
  | 'U' // Seat suitable for unaccompanied minors"
  | 'UP' // Upper deck"
  | 'V' // Seat to be left vacant or offered last"
  | 'W' // Window seat"
  | 'WA' // Window and aisle together"
  | 'X' // No facility seat (indifferent seat)"
  | 'Z'; // Buffer zone seat"

export enum RowSeatCharacteristicEnum {
  // BulkheadSeat = 'K', // TODO: Revisit this later
  ExitRowSeat = 'E',
  LegSpaceSeat = 'L',
  // OverwingSeat = 'OW', // TODO: Revisit this later
}

export interface Offer {
  rateKey: string;
  passengerId: number;
  price: Price;
}

export interface Price {
  baseFare: number;
  tax: number;
  total: number;
  currencyCode: string;
}

export type RowTag = 'ExitRow' | 'WingRow' | 'BulkheadRow';
