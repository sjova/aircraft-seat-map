import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ItemState,
  SeatMapCodeState,
  SeatMapState,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  ItemAvailabilityEnum,
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
  @Input() passengerId: number;

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

  getTooltip(item: ItemState): string {
    if (item.selected) {
      return 'This seat belong to ...';
    } else {
      return `Seat ${item.rowNumber} - Standard seat - 0€`;
    }
  }

  selectSeat(seat: ItemState) {
    if (seat.availability === this.seatAvailability.Available) {
      this.seatSelection.next({
        flightNumber: this.flightNumber,
        passengerId: `${this.passengerId}`,
        seatRowNumber: `${seat.rowNumber}`,
        seatCode: seat.code,
      });
    }
  }
}
