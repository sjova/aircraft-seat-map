import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ItemState,
  PassengerState,
  SeatMapCodeState,
  SeatMapState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  ItemAvailabilityEnum,
  ItemCharacteristicEnum,
  ItemTypeEnum,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-api-response';

export interface SeatSelection {
  flightNumber: string;
  passengerId: string;
  seatRowNumber: string;
  seatCode: string;
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
  @Input() passengers: PassengerState;

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
        this.passengers[item.passengerId].firstName
      } ${this.passengers[item.passengerId].lastName}`;
    } else {
      return `${tooltipText} - Standard seat - 0€`;
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
      });
    }
  }
}
