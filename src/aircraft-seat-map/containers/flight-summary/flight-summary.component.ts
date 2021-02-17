import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@app/store';
import { FlightDetails } from '@app/aircraft-seat-map/shared/models/flight-details';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSummaryComponent implements OnInit {
  flightsDetails$: Observable<FlightDetails[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.flightsDetails$ = this.store.select<FlightDetails[]>('flightsDetails');
  }
}
