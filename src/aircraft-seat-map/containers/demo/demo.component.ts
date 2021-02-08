import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { FlightSeatMapService } from '@app/aircraft-seat-map/shared/services/flight-seat-map/flight-seat-map.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnInit {
  flightSeatMap$: Observable<any>;

  constructor(private flightSeatMapService: FlightSeatMapService) {}

  ngOnInit(): void {
    this.flightSeatMap$ = this.flightSeatMapService.getFlightSeatMap();
  }
}
