import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Renderer2,
  OnDestroy,
  Inject,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { exhaustMap, filter, map, tap } from 'rxjs/operators';

import { Store, UserSelection } from '@app/store';
import { FlightSeatMapService } from '@app/aircraft-seat-map/shared/services/flight-seat-map/flight-seat-map.service';
import { SeatSelection } from '@app/aircraft-seat-map/components/seat-map/seat-map.component';
import {
  FlightsState,
  FlightsTotalPrice,
} from '@app/aircraft-seat-map/shared/models/flight-state';
import {
  prepareDefaultUserSelection,
  responseToState,
  seatSelectionValidation,
  setDemoQueryParam,
  updateFlightsState,
} from '@app/aircraft-seat-map/shared/helpers';
import { DOCUMENT } from '@angular/common';

interface Step {
  id: string;
  type: 'flight' | 'passenger';
}

const PAGE_SEAT_SELECTION = 'page-seat-selection';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatSelectionComponent implements OnInit, OnDestroy {
  flights$: Observable<FlightsState>;
  totalPrice$: Observable<FlightsTotalPrice>;
  isSeatSelectionValid: boolean;

  userSelection: UserSelection;
  queryParams: Params;

  steps: UserSelection[] = [];
  stepIndex = 0;
  defaultPassengerId: number;

  // TODO: Revisit this later
  initialFlightsState: FlightsState;

  constructor(
    @Inject(DOCUMENT) private document,
    private renderer: Renderer2,
    private flightSeatMapService: FlightSeatMapService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get userSelectionPassengerIdAsNumber(): number {
    return +this.userSelection.passengerId;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, PAGE_SEAT_SELECTION);

    this.queryParams = setDemoQueryParam(
      this.activatedRoute,
      this.router,
      this.queryParams
    );

    this.store
      .select<UserSelection>('userFlightsSelection')
      // TODO: Revisit this later
      // .pipe(filter(Boolean), take(1))
      .pipe(filter(Boolean))
      .subscribe(
        (userSelection: UserSelection) => (this.userSelection = userSelection)
      );

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
                this.store.set('flights', flightsState);
              })
            );
        }
      }),
      tap((flightsState: FlightsState) => {
        // TODO: Revisit this
        if (this.initialFlightsState === undefined) {
          this.store.set(
            'userFlightsSelection',
            prepareDefaultUserSelection(flightsState)
          );

          this.setSteps(flightsState);
          this.initialFlightsState = flightsState;
        }
      }),
      tap(
        (flightsState: FlightsState) =>
          (this.isSeatSelectionValid = seatSelectionValidation(flightsState))
      )
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, PAGE_SEAT_SELECTION);
  }

  onSelection(event: SeatSelection) {
    console.log(event);

    const stateName = 'flights';
    const updatedFlightsState = updateFlightsState(
      this.store.selectStateValue<FlightsState>(stateName),
      event
    );

    this.store.set(stateName, updatedFlightsState);

    // Prevent next step until select new seat
    if (!event.selected) {
      this.nextStep();
    }

    this.isSeatSelectionValid = updatedFlightsState.isSeatSelectionValid;
  }

  // V1
  // selectFlight(event: MatSelectChange) {
  //   this.store.set('userFlightsSelection', {
  //     ...this.userSelection,
  //     flightNumber: event.value,
  //   });
  // }

  // V1
  // selectPassenger(event: MatSelectChange) {
  //   this.store.set('userFlightsSelection', {
  //     ...this.userSelection,
  //     passengerId: event.value,
  //   });
  // }

  private setSteps(flightsState: FlightsState): void {
    flightsState.allIds.forEach((flightNumber) => {
      const [firstPassengerId] = flightsState.byId[
        flightNumber
      ].passengers.allIds;
      this.defaultPassengerId = +firstPassengerId;

      flightsState.byId[flightNumber].passengers.allIds.forEach(
        (passengerId) => {
          this.steps = [
            ...this.steps,
            {
              flightNumber,
              passengerId,
            },
          ];
        }
      );
    });
  }

  // Demo: Additional ideas
  selectFlightV2(flightNumber: string) {
    const newState = {
      ...this.userSelection,
      flightNumber,
      passengerId: `${this.defaultPassengerId}`,
    };

    this.stepIndex = this.steps.findIndex(
      (step) =>
        step.flightNumber === newState.flightNumber &&
        step.passengerId === newState.passengerId
    );

    this.store.set('userFlightsSelection', newState);
  }

  // Demo: Additional ideas
  selectPassengerV2(flightNumber: string, passengerId: string) {
    const newState = {
      ...this.userSelection,
      flightNumber,
      passengerId,
    };

    this.stepIndex = this.steps.findIndex(
      (step) =>
        step.flightNumber === newState.flightNumber &&
        step.passengerId === newState.passengerId
    );

    this.store.set('userFlightsSelection', newState);
  }

  nextStep() {
    this.stepIndex++;

    if (this.stepIndex < this.steps.length) {
      this.store.set('userFlightsSelection', {
        ...this.userSelection,
        flightNumber: this.steps[this.stepIndex].flightNumber,
        passengerId: this.steps[this.stepIndex].passengerId,
      });
    }
  }

  // prevStep() {
  //   this.stepIndex--;
  //
  //   this.store.set('userFlightsSelection', {
  //     ...this.userSelection,
  //     flightNumber: this.steps[this.stepIndex].flightNumber,
  //     passengerId: this.steps[this.stepIndex].passengerId,
  //   });
  // }

  cancelSeatSelection() {
    this.store.set('flights', { ...this.initialFlightsState });
    this.router.navigate(['/demo/summary'], { queryParams: this.queryParams });
  }
}
