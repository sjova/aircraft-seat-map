import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FlightSeatMap,
  FlightSeatMapResponse,
} from '@app/aircraft-seat-map/shared/models/flight-seat-map-response';

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatMapComponent implements OnInit {
  @Input() flightSeatMap: FlightSeatMapResponse;
  @Input() flight: string;
  @Input() traveler: string;

  seatMap: FlightSeatMap;

  constructor() {}

  ngOnInit(): void {
    this.prepareRawFlightSeatMapData();
  }

  private prepareRawFlightSeatMapData() {
    const [firstItem] = this.flightSeatMap.items;
    this.seatMap = firstItem.seatMap;
  }
}
