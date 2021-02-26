import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Store } from '@app/store';
import { Observable } from 'rxjs';
import {
  FlightsState,
  FlightsTotalPrice,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { setDemoQueryParam } from '@app/aircraft-seat-map/shared/helpers/query-params';

@Component({
  selector: 'app-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightSummaryComponent implements OnInit {
  flights$: Observable<FlightsState>;
  totalPrice$: Observable<FlightsTotalPrice>;

  queryParams: Params;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.queryParams = setDemoQueryParam(
      this.activatedRoute,
      this.router,
      this.queryParams
    );

    this.totalPrice$ = this.store.select<FlightsTotalPrice>(
      'flightsTotalPrice'
    );

    this.flights$ = this.store.select<FlightsState>('flights');
  }
}
