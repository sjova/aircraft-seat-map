import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  SeatMapRowItem,
  Passengers,
  SeatMapRow,
  SeatMap,
} from '@app/aircraft-seat-map/shared/models/flight';
import {
  RowSeatAvailabilityEnum,
  RowSeatCharacteristicEnum,
  RowItemTypeEnum,
  Offer,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';

export interface SeatMapSeatSelection {
  flightNumber: string;
  passengerId: string;
  seatRowNumber: string;
  seatCode: string;
  seatOffer: Offer;
  selected: boolean;
}

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatMapComponent {
  @Input() flightNumber: string;
  @Input() passengerId: string;

  @Input() passengers: Passengers;
  @Input()
  set seatMap(seatMap: SeatMap) {
    if (seatMap) {
      this.seatMapMatrix = Object.values(seatMap).map((row: SeatMapRow) =>
        Object.values(row)
      );
    }
  }

  @Output() seatSelect = new EventEmitter<SeatMapSeatSelection>();

  seatMapMatrix: SeatMapRowItem[][];

  rowItemType = RowItemTypeEnum;

  seatAvailability = RowSeatAvailabilityEnum;
  seatCharacteristic = RowSeatCharacteristicEnum;

  getTooltip(seat: SeatMapRowItem): string {
    const tooltipBaseText = `Seat ${seat.rowNumber}${seat.code}`;

    if (seat.selected) {
      return `${tooltipBaseText} - ${this.getPassengerPartialTooltip(seat)}`;
    } else {
      return `${tooltipBaseText} - ${this.getOfferPartialTooltip(seat)}`;
    }
  }

  private getPassengerPartialTooltip(seat: SeatMapRowItem): string {
    return `This seat belong to ${
      this.passengers.byId[seat.passengerId].firstName
    } ${this.passengers.byId[seat.passengerId].lastName}`;
  }

  private getSeatType(seat: SeatMapRowItem): string {
    const seatCharacteristics = seat.characteristics;

    let type = '';

    // `Extra Legroom`
    if (seatCharacteristics.includes(this.seatCharacteristic.LegSpaceSeat)) {
      type += 'Extra Legroom';
    }

    // `Extra Legroom` and/or `Emergency Exit Row`
    if (seatCharacteristics.includes(this.seatCharacteristic.ExitRowSeat)) {
      type += type.length ? ', ' : '';
      type += 'Emergency Exit Row';
    }

    // `Standard Seat` - Default Seat Type
    if (type.length === 0) {
      type = 'Standard Seat';
    }

    return type;
  }

  private getOfferPartialTooltip(seat: SeatMapRowItem): string {
    if (
      seat.offers &&
      seat.offers[this.passengerId] &&
      seat.offers[this.passengerId].price
    ) {
      const totalPrice = seat.offers[this.passengerId].price.total.toFixed(2);
      const currencyCode = seat.offers[this.passengerId].price.currencyCode;

      return `${this.getSeatType(seat)} - ${totalPrice} ${currencyCode}`;
    } else {
      return `${this.getSeatType(seat)}`;
    }
  }

  selectSeat(seat: SeatMapRowItem) {
    if (
      seat.availability === this.seatAvailability.Available &&
      (!seat.passengerId || seat.passengerId === this.passengerId)
    ) {
      this.seatSelect.next({
        flightNumber: this.flightNumber,
        passengerId: this.passengerId,
        // TODO: Revisit conversion `number` to `string` after migration to DIB API
        seatRowNumber: `${seat.rowNumber}`,
        seatCode: seat.code,
        seatOffer: seat.offers ? seat.offers[this.passengerId] : undefined,
        selected: seat.selected,
      });
    }
  }
}
