import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { exhaustMap, filter, map, take, tap } from 'rxjs/operators';

import { Store, UserSelection } from '@app/store';
import { FlightSeatMapService } from '@app/aircraft-seat-map/shared/services/flight-seat-map/flight-seat-map.service';
import { SeatSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';
import {
  FlightsState,
  FlightsTotalPrice,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  getTotalPrice,
  prepareDefaultUserSelection,
  responseToState,
  seatSelectionValidation,
  setDemoQueryParam,
  updateFlightsState,
} from '@app/aircraft-seat-map/shared/helpers';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatSelectionComponent implements OnInit {
  flights$: Observable<FlightsState>;
  totalPrice$: Observable<FlightsTotalPrice>;
  isSeatSelectionValid: boolean;

  userSelection: UserSelection;
  queryParams: Params;

  constructor(
    private flightSeatMapService: FlightSeatMapService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get userSelectionPassengerIdAsNumber(): number {
    return +this.userSelection.passengerId;
  }

  ngOnInit(): void {
    this.queryParams = setDemoQueryParam(
      this.activatedRoute,
      this.router,
      this.queryParams
    );

    this.totalPrice$ = this.store.select<FlightsTotalPrice>(
      'flightsTotalPrice'
    );

    this.store
      .select<UserSelection>('userFlightsSelection')
      .pipe(filter(Boolean), take(1))
      .subscribe((userSelection: UserSelection) => {
        this.userSelection = userSelection;
      });

    // TODO: Revisit CORS issues and setup
    // this.flightSeatMap$ = this.flightSeatMapService.getFlightSeatMap();

    // TODO: Revisit this after demo
    this.flights$ = this.store.select<FlightsState>('flights').pipe(
      exhaustMap((flightsState) => {
        if (Boolean(flightsState)) {
          return of(flightsState);
        } else {
          return this.flightSeatMapService
            .getFlightSeatMapMock(this.queryParams.demo)
            .pipe(
              map(responseToState),
              tap((flightsState: FlightsState) => {
                this.store.set(
                  'userFlightsSelection',
                  prepareDefaultUserSelection(flightsState)
                );
                this.store.set('flights', flightsState);
              })
            );
        }
      }),
      tap(
        (flightsState: FlightsState) =>
          (this.isSeatSelectionValid = seatSelectionValidation(flightsState))
      )
    );
  }

  onSelection(event: SeatSelection) {
    const stateName = 'flights';
    const updatedFlightsState = updateFlightsState(
      this.store.selectStateValue<FlightsState>(stateName),
      event
    );
    this.store.set(stateName, updatedFlightsState);

    this.store.set('flightsTotalPrice', getTotalPrice(updatedFlightsState));

    this.isSeatSelectionValid = seatSelectionValidation(updatedFlightsState);
  }

  selectFlight(event: MatSelectChange) {
    this.store.set('userFlightsSelection', {
      ...this.userSelection,
      flightNumber: event.value,
    });
  }

  selectPassenger(event: MatSelectChange) {
    this.store.set('userFlightsSelection', {
      ...this.userSelection,
      passengerId: event.value,
    });
  }
}
