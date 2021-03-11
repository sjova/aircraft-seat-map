import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ItemState,
  PassengersState,
  SeatMapCodeState,
  SeatMapState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  ItemAvailabilityEnum,
  ItemCharacteristicEnum,
  ItemTypeEnum,
  Offer,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';

export interface SeatSelection {
  flightNumber: string;
  passengerId: string;
  seatRowNumber: string;
  seatCode: string;
  seatOffer: Offer;
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
  @Input() passengers: PassengersState;

  @Input()
  set seatMapState(seatMap: SeatMapState) {
    if (seatMap) {
      this.seatMap = Object.values(seatMap).map((row: SeatMapCodeState) =>
        Object.values(row)
      );
    }
  }
  seatMap: ItemState[][];

  @Output() seatSelection = new EventEmitter<SeatSelection>();

  itemItemType = ItemTypeEnum;
  seatAvailability = ItemAvailabilityEnum;
  itemCharacteristic = ItemCharacteristicEnum;

  getTooltip(item: ItemState): string {
    const tooltipText = `Seat ${item.rowNumber}${item.code}`;

    if (item.selected) {
      return `${tooltipText} - This seat belong to ${
        this.passengers.byId[item.passengerId].firstName
      } ${this.passengers.byId[item.passengerId].lastName}`;
    } else {
      if (
        item.offers &&
        item.offers[this.passengerId] &&
        item.offers[this.passengerId].price
      ) {
        return `${tooltipText} - Standard seat - ${item.offers[
          this.passengerId
        ].price.total.toFixed(2)} ${
          item.offers[this.passengerId].price.currencyCode
        }`;
      } else {
        return `${tooltipText} - Standard seat`;
      }
    }
  }

  selectSeat(seat: ItemState) {
    if (
      seat.availability === this.seatAvailability.Available &&
      (!seat.passengerId || seat.passengerId === this.passengerId)
    ) {
      this.seatSelection.next({
        flightNumber: this.flightNumber,
        passengerId: `${this.passengerId}`,
        seatRowNumber: `${seat.rowNumber}`,
        seatCode: seat.code,
        seatOffer: seat.offers ? seat.offers[this.passengerId] : undefined,
      });
    }
  }
}
